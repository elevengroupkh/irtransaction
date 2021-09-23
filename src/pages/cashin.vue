<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Cash in"
        :data="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
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
              <q-btn color="primary" @click="updatestatus = 'approved';  confirmdialog(props.row)" :label="$t('Approve')" class="q-mr-sm"/>
              <q-btn color="warning" @click="updatestatus = 'cancelled';  confirmdialog(props.row)" :label="$t('Cancel')" />
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-to_company_account="props">
          <q-td :props="props">
            {{ props.row.to_company_bank+' '+props.row.to_company_account }}
          </q-td>
        </template>

        <template v-slot:body-cell-updated_at="props">
          <q-td :props="props">
            <span v-if="props.row.update_by">{{ formatdate(props.row.updated_at) }}</span>
          </q-td>
        </template>

        <template v-slot:body-cell-created_at="props">
          <q-td :props="props">
            {{ formatdate(props.row.created_at) }}
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
          <div class="q-table__title">Cash in</div>
          <div class="">
            <div class="row">
              <div class="col-12">
                <div class="row align-items-center">
                  <q-select
                    v-model="formsearch.reqStatus"
                    :options="reqstatusoptions"
                    option-value="name"
                    option-label="value"
                    filled
                    label="Status"
                    stack-label
                    style="width: 150px"
                  />
                  <q-input  label="Start" stack-label v-model="formsearch.reqCreateDateFrom" filled type="date" class="q-mx-sm"/>
                  <q-input  label="End" stack-label v-model="formsearch.reqCreateDateTo" filled type="date" class="q-mx-sm"/>

                <q-btn
                  color="green"
                  icon-right="search"
                  label="filter"
                  @click.prevent="getRecord()"
                />
                </div>
              </div>
            </div>
            <div class="row text-right q-mt-md">

              <q-btn @click="addtransaction" outline color="primary" label="Add Cash in" class="q-mr-xs" v-if="userRole=='csstaff' || userRole=='admin'"/>

              <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>

              <q-btn
                flat
                round
                dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                v-if="mode === 'list'"
              >
                <q-tooltip
                  :disable="$q.platform.is.mobile"
                  v-close-popup
                >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
                </q-tooltip>
              </q-btn>

              <q-btn
                flat
                round
                dense
                :icon="mode === 'grid' ? 'list' : 'grid_on'"
                @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
                v-if="!props.inFullscreen"
              >
                <q-tooltip
                  :disable="$q.platform.is.mobile"
                  v-close-popup
                >{{mode==='grid' ? 'List' : 'Grid'}}
                </q-tooltip>
              </q-btn>

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
    <q-dialog v-model="new_customer" persistent>
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            <span v-if="edit==false">Add Cash in</span>
            <span v-if="edit==true">Edit Cash in</span>
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">{{ $t('Order #') }}</q-item-label>
                  <q-input dense outlined v-model="customer.ordernumber" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">{{ $t('From Bank') }}</q-item-label>
                  <q-select v-model="bank"
                    :options="bankoption"
                    option-value="id"
                    option-label="name"
                    map-options
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">{{ $t('From Account no') }}</q-item-label>
                  <q-input dense outlined v-model="customer.from_account_no" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">{{ $t('Amount') }}</q-item-label>
                  <q-input type="number" min="0" dense outlined v-model="customer.amount" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">{{ $t('Transaction Id') }}</q-item-label>
                  <q-input dense outlined v-model="customer.transaction_id" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">{{ $t('To Company Account no') }}</q-item-label>
                  <q-select
                    v-model="to_company_account"
                    :options="companybankoption"
                    :display-value="to_company_account ? to_company_account.bank_name+' '+to_company_account.accountno : '' "
                  >
                    <template v-slot:option="scope">
                      <q-item
                        v-bind="scope.itemProps"
                        v-on="scope.itemEvents"
                      >
                        <q-item-section>
                          <q-item-label>{{ scope.opt.bank_name+" "+scope.opt.accountno }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">{{ $t('Username') }}</q-item-label>
                  <q-input dense outlined v-model="customer.username" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">{{ $t('Customer Name') }}</q-item-label>
                  <q-input dense outlined v-model="customer.customername" />
                </q-item-section>
              </q-item>
              <label style="color:red">{{ errormessge }}</label>
            </q-list>
          </q-form>

        </q-card-section>

        <q-card-actions align="right" class="text-teal">
          <q-btn v-if="edit==false" :label="$t('Save')" @click.prevent="addRecord" color="primary" :disable="buttondisable" :loading="submitting">
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
          <q-btn v-if="edit==true" label="Edit" @click.prevent="editRecord" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Please confirm to delete id {{ deleteid }}.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" color="primary" v-close-popup @click="deleteRecord()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="prompt" persistent>

      <q-card style="min-width: 400px" >

        <q-card-section >
          <div class="text-h6">
            Change Status to {{ updatestatus }}
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>

        </q-card-section>
        <q-separator inset></q-separator>
        <q-spinner
          color="primary"
          size="3em"
          v-if="changestatusloading"
        />
        <div v-if="!changestatusloading">

          <q-card-section class="">
            <div class="row">
              <div class="col-4 text-left">
                TID :
              </div>
              <div class="col-8 text-left">
                {{ confirmrow.transaction_id }}
              </div>
            </div>
            <div class="row">
              <div class="col-4 text-left">
                Order Number :
              </div>
              <div class="col-8 text-left">
                {{ confirmrow.ordernumber }}
              </div>
            </div>
            <div class="row">
              <div class="col-4 text-left">
                Amount :
              </div>
              <div class="col-8 text-left">
                {{ confirmrow.amount }}
              </div>
            </div>
            <div class="row">
              <div class="col-4 text-left">
                Transfer from :
              </div>
              <div class="col-8 text-left">
                {{ confirmrow.from_bank }} {{ confirmrow.from_account_no }}
              </div>
            </div>
            <div class="row">
              <div class="col-4 text-left">
                Transfer to :
              </div>
              <div class="col-8 text-left">
                {{ confirmrow.to_company_bank }} {{ confirmrow.to_company_account }}
              </div>
            </div>
            <div class="row">
              <div class="col-4 text-left">
                Username :
              </div>
              <div class="col-8 text-left">
                {{ confirmrow.username }}
              </div>
            </div>
            <div class="row">
              <div class="col-4 text-left">
                Created date :
              </div>
              <div class="col-8 text-left">
                {{ confirmrow.created_at }}
              </div>
            </div>
            <div class="q-pb-xs" v-if="updatestatus=='approved'">
              <q-item-label class="q-pb-xs">Real Amount : </q-item-label>
              <q-input type="number" min="0" dense v-model="real_amount" />
            </div>
            <q-item-label class="q-pb-xs">{{ $t('Note') }} : </q-item-label>
            <q-input dense v-model="note" autofocus />
          </q-card-section>


          <q-card-actions align="right" class="text-primary">
            <q-btn v-if="updatestatus=='cancelled'" :label="$t('Cancel')" color="warning" @click.prevent="changestatus()" :disable="buttoncanceldisable" />
            <q-btn v-if="updatestatus=='approved'" :label="$t('Approve')" color="primary" @click.prevent="changestatus()" />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>

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
                  from_account_no : '',
                  amount : '',
                  transaction_id : '',
                  to_company_account : '',
                  username : '',
                  customername : '',
                },
                new_customer: false,
                mode: "list",
                columns: [
                    {
                        name: "ordernumber",
                        required: true,
                        label: "Order No",
                        align: "left",
                        field: "ordernumber",
                        sortable: true
                    },
                    {
                        name: "from_bank",
                        align: "left",
                        label: "From Bank",
                        field: "from_bank",
                        sortable: true
                    },
                    {
                        name: "from_account_no",
                        align: "left",
                        label: "From Account",
                        field: "from_account_no",
                        sortable: true
                    },
                    {
                        name: "amount",
                        align: "left",
                        label: "amount",
                        field: "amount",
                        sortable: true
                    },
                    {
                        name: "real_amount",
                        align: "left",
                        label: "Real amount",
                        field: "real_amount",
                        sortable: true
                    },
                    {
                        name: "transaction_id",
                        align: "left",
                        label: "TID",
                        field: "transaction_id",
                        sortable: true
                    },
                    {
                        name: "to_company_account",
                        align: "left",
                        label: "To Company Account",
                        sortable: true
                    },
                    {
                        name: "username",
                        align: "left",
                        label: "Username",
                        field: "username",
                        sortable: true
                    },
                    {
                        name: "customername",
                        align: "left",
                        label: "Customer Name",
                        field: "customername",
                        sortable: true
                    },
                    {
                        name: "status",
                        align: "left",
                        label: "Status",
                        field: "status",
                        sortable: true
                    },

                    {
                        name: "create_by",
                        align: "left",
                        label: "Created by",
                        field: "create_by",
                        sortable: true
                    },
                    {
                        name: "created_at",
                        align: "left",
                        label: "Created",
                        field: "created_at",
                        sortable: true
                    },
                    {
                        name: "update_by",
                        align: "left",
                        label: "Updated by",
                        field: "update_by",
                        sortable: true
                    },
                    {
                        name: "updated_at",
                        align: "left",
                        label: "Updated",
                        field: "updated_at",
                        sortable: true
                    },

                    {
                        name: "action",
                    },
                    {
                        name: "note",
                        align: "left",
                        label: "Note",
                        field: "note",
                        sortable: true
                    },
                ],
                data: [],
                pagination: {
                    rowsPerPage: 100
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
                to_company_account:'',

                prompt : false,
                note : '',
                real_amount : '',
                updatestatus : '',
                confirmrow : '',
                updatestatusvalue : {
                  note : '',
                  status : '',
                  real_amount : '',
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
              this.customer.from_account_no != '' &&
              this.customer.amount != '' &&
              this.customer.transaction_id != '' &&
              this.customer.username != '' &&
              this.to_company_account != ''
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

                const status = exportFile("cashin.csv", content, "text/csv");

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


            async deleteRecord (id) {
              await this.$axios.delete('api/transaction/'+this.deleteid)
              .then((response)=>{
                this.getRecord()
              })
            },
            async editRecord() {
              this.loading = true
              await this.$axios.put('api/transaction/'+this.editid, this.customer)
              .then((response)=>{
                this.getRecord()
              })
            },
            editRowRecord(row) {
              this.edit = true
              this.customer.name = row.name
              this.customer.active = row.active
              this.editid = row.id
              this.new_customer = true
            },
            async addRecord() {
              this.submitting = true
              this.customer.transaction_type = 'cashin'
              this.customer.from_bank = this.bank.id
              this.customer.to_company_account = this.to_company_account.id
              await this.$axios.post('api/transaction', this.customer)
              .then((response)=>{
                if (response.data.status == 'ok'){
                  this.new_customer = false
                  this.getRecord()
                }else{
                  this.errormessge = response.data.errormessage
                }
                this.submitting = false
                //this.data = response.data
                //console.log(response)
              })
              .catch(()=>{
                this.submitting = false
              })
              .finally(()=>{
                this.submitting = false
              })
            },
            async getRecord() {
              this.loading = true
              //this.formsearch.reqStatus = this.reqStatus
              await this.$axios.get('api/transaction?transaction_type=cashin&status='+this.formsearch.reqStatus+'&startdate='+this.formsearch.reqCreateDateFrom+'&enddate='+this.formsearch.reqCreateDateTo+'&active=1')
              .then((response)=>{
                this.data = response.data.transaction
                this.bankoption = response.data.bank
                this.companybankoption = response.data.companyaccount
                this.loading = false
              })
            },
            async getBank() {
              await this.$axios.get('api/bank')
              .then((response)=>{
                this.bankoption = response.data
              })
            },
            async getCompanyAccount() {
              await this.$axios.get('api/companyaccount?active=1')
              .then((response)=>{
                this.companybankoption = response.data
              })
            },
            confirmdialog(row) {
              this.note = ''
              this.confirmrow = row
              this.prompt = true
            },
            async changestatus() {
              this.changestatusloading = true
              this.updatestatusvalue.note = this.note
              this.updatestatusvalue.real_amount = this.real_amount
              this.updatestatusvalue.status = this.updatestatus
              await this.$axios.put('api/transaction/changestatus/'+this.confirmrow.id, this.updatestatusvalue)
              .then((response)=>{
                this.getRecord()
                this.changestatusloading = false
                this.prompt = false
                this.real_amount = ''
              })
            },
            addtransaction() {
              this.submitting = false
              this.errormessge= '';
              this.edit = false;
              this.customer = {
                ordernumber : '',
                bank : '',
                from_account_no : '',
                amount : '',
                transaction_id : '',
                to_company_account : '',
                username : ''
              };
              this.to_company_account = '';
              this.bank = '';
              this.new_customer = true
            }
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
