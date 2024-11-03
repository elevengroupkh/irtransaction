<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="w2w"
        :data="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="id"
        :grid="mode=='grid'"
        :filter="filter"
        :pagination.sync="pagination"
        :loading="loading"
      >

        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div v-if="props.row.status=='requested' && (userRole=='csapproval' || userRole=='admin')">
              <q-btn color="primary" @click="updatestatus = 'approved';  confirmdialog(props.row)" label="Approve" class="q-mr-sm"/>
              <q-btn color="warning" @click="updatestatus = 'cancelled';  confirmdialog(props.row)" label="Cancel" />
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-from_company_account="props">
          <q-td :props="props">
            {{ props.row.from_company_bank+' '+props.row.from_company_account }}
          </q-td>
        </template>

        <template v-slot:body-cell-updated_at="props">
          <q-td :props="props">
            {{ formatdate(props.row.updated_at) }}
          </q-td>
        </template>

        <template v-slot:body-cell-created_at="props">
          <q-td :props="props">
            {{ formatdate(props.row.created_at) }}
          </q-td>
        </template>

        <template v-slot:body-cell-w2w="props">
          <q-td :props="props">
            w2w
          </q-td>
        </template>

        <template v-slot:body-cell-register="props">
          <q-td :props="props">
            register
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="(props.row.status == 'approved')?'green':(props.row.status == 'requested'?'red':'grey')"
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 85px"
            >{{props.row.status}}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:top="props">
          <div class="q-table__title">W2W</div>
          <div class="">
            <div class="row text-right q-mt-md">

              <q-btn
                color="primary"
                icon-right="archive"
                label="Export to csv"
                no-caps
                @click="exportTable"
              />
            </div>
          </div>
        </template>
      </q-table>
    </q-card>

  </q-page>
</template>

<script>
    import { date } from 'quasar'
    import {exportFile} from "quasar";

    function wrapCsvValue(val, formatFn) {
        let formatted = formatFn !== void 0 ? formatFn(val) : val;

        formatted =
            formatted === void 0 || formatted === null ? "" : String(formatted);

        formatted = formatted.split('"').join('""');

        return `"${formatted}"`;
    }

    export default {
        data() {
            return {
                filter: "",
                customer: {
                  ordernumber : '',
                  bank : '',
                  to_account_no : '',
                  amount : '',
                  transaction_id : '',
                  from_company_account : '',
                  username : '',
                  customername : '',
                },
                new_customer: false,
                mode: "list",
                columns: [
                    {
                        name: "receiverAccount",
                        label: "Receiver Account",
                        align: "left",
                        field: "to_account_no",
                        sortable: true
                    },
                    {
                        name: "amount",
                        align: "left",
                        label: "Amount",
                        field: "amount",
                        sortable: true
                    },
                    {
                        name: "remark",
                        align: "left",
                        label: "Remark",
                    },
                    {
                        name: "purpose",
                        align: "left",
                        label: "Purpose",
                    },
                ],
                data: [],
                pagination: {
                    rowsPerPage: 10
                },
                loading : true,
                edit : false,
                editid : "",
                deleteid : "",
                confirm : false,

                formsearch : {
                  reqStatus : 'all',
                  reqCreateDateFrom : date.formatDate(date.subtractFromDate(Date.now(), { days: 1}), 'YYYY-MM-DD'),
                  reqCreateDateTo : date.formatDate(Date.now(), 'YYYY-MM-DD'),
                },
                reqstatusoptions : ['all','requested','approved','cancelled'],
                bankoption : [],
                bank:'',
                companybankoption : [],
                from_company_account:'',

                prompt : false,
                note : '',
                updatestatus : '',
                confirmrow : '',
                updatestatusvalue : {
                  note : '',
                  status : '',
                },
                changestatusloading : false,
                errormessge : '',
                submitting : false,
            };
        },
        computed: {
          userRole() {
            return this.$store.state.auth.user.rolename;
          },
          buttondisable() {
            if (
              this.customer.ordernumber != '' &&
              this.bank != '' &&
              this.customer.to_account_no != '' &&
              this.customer.amount != '' &&
              this.customer.transaction_id != '' &&
              this.customer.username != '' &&
              this.from_company_account != ''
            ){
              return false
            }else{
              return true
            }

          },
          buttoncanceldisable() {
            if (
              this.note != ''
            ){
              return false
            }else{
              return true
            }
          }
        },
        methods: {
            exportTable() {
                // naive encoding to csv format
                const content = [this.columns.map(col => wrapCsvValue(col.label))]
                    .concat(
                        this.data.map(row =>
                            this.columns
                                .map(col =>
                                    wrapCsvValue(
                                        typeof col.field === "function"
                                            ? col.field(row)
                                            : row[col.field === void 0 ? col.name : col.field],
                                        col.format
                                    )
                                )
                                .join(",")
                        )
                    )
                    .join("\r\n");

                const status = exportFile("WING-2-WING Bulk.csv", content, "text/csv");

                if (status !== true) {
                    this.$q.notify({
                        message: "Browser denied file download...",
                        color: "negative",
                        icon: "warning"
                    });
                }
            },
            formatdate(dateshow){
              return date.formatDate(dateshow, 'YYYY-MM-DD HH:mm:ss')
            },
            async getRecord() {
              this.loading = true
              await this.$axios.post('api/wingreport/detail', { 'id': this.$route.query.id })
              .then((response)=>{
                console.log(response)
                this.data = response.data
                this.loading = false
              })
            },
        },
        async mounted() {
          //await this.getCompanyAccount()
          //await this.getBank()
          await this.getRecord()
        }
    };
</script>

<style>
  .q-chip__content {
    display: block;
    text-align: center;
  }
  .q-td .q-chip{
    width: auto !important;
  }
  .q-table__top{
    justify-content: space-between;
  }
  .w-100{
    width: 100%;
  }
</style>
