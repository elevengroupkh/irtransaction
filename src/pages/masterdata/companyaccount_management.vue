<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Company Bank Account"
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
            <q-btn color="primary" label="Edit" @click="editRowRecord(props.row)"/>
            <q-btn class="q-ml-sm" color="red" label="Delete" @click="deleteid=props.row.id ; confirm = true"/>
          </q-td>
        </template>

        <template v-slot:body-cell-updated_at="props">
          <q-td :props="props">
            {{ formatdate(props.row.updated_at) }}
          </q-td>
        </template>

        <template v-slot:body-cell-created_at="props">
          <q-td :props="props">
            {{ formatdate(props.row.updated_at) }}
          </q-td>
        </template>

        <template v-slot:top-right="props">
          <q-btn @click="edit = false; customer={active : true}; new_customer=true" outline color="primary" label="Add New" class="q-mr-xs"/>

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
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="new_customer">
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            <span v-if="edit==false">Add new Company Bank Account</span>
            <span v-if="edit==true">Edit Company Bank Account</span>
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Bank</q-item-label>
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
                  <q-item-label class="q-pb-xs">Account no</q-item-label>
                  <q-input dense outlined v-model="customer.accountno" label="Account No"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Active</q-item-label>
                  <q-toggle v-model="customer.active" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-teal">
          <q-btn v-if="edit==false" label="Save" @click.prevent="addRecord" color="primary" v-close-popup/>
          <q-btn v-if="edit==true" label="Edit" @click.prevent="editRecord" color="primary" v-close-popup/>
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
                  active : true
                },
                new_customer: false,
                mode: "list",
                columns: [
                    {
                        name: "accountno",
                        required: true,
                        label: "Account no",
                        align: "left",
                        field: "accountno",
                        sortable: true
                    },
                    {
                        name: "name",
                        required: true,
                        label: "Bank",
                        align: "left",
                        field: "bank_name",
                        sortable: true
                    },
                    {
                        name: "active",
                        align: "left",
                        label: "Active",
                        field: "active",
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
                        name: "updated_at",
                        align: "left",
                        label: "Updated",
                        field: "updated_at",
                        sortable: true
                    },
                    {
                        name: "action",
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
                bankoption : [],
                bank:'',
            };
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

                const status = exportFile("companyaccount-management.csv", content, "text/csv");

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
              await this.$axios.delete('api/companyaccount/'+this.deleteid)
              .then((response)=>{
                this.getRecord()
              })
            },
            async editRecord() {
              //console.log(this.bank)
              this.loading = true
              this.customer.bank = this.bank.id
              await this.$axios.put('api/companyaccount/'+this.editid, this.customer)
              .then((response)=>{
                this.getRecord()
              })
            },
            editRowRecord(row) {
              this.edit = true
              this.customer.accountno = row.accountno
              //this.customer.bank = row.bank_id
              this.bank = row.bank_id
              this.customer.active = row.active
              this.editid = row.id
              this.new_customer = true
            },
            async addRecord() {
              this.customer.bank = this.bank.id
              await this.$axios.post('api/companyaccount', this.customer)
              .then((response)=>{
                this.getRecord()
                //this.data = response.data
                //console.log(response)
              })
            },
            async getRecord() {
              this.loading = true
              await this.$axios.get('api/companyaccount')
              .then((response)=>{
                this.data = response.data
                this.loading = false
              })
            },
            async getBank() {
              await this.$axios.get('api/bank')
              .then((response)=>{
                this.bankoption = response.data
              })
            },
        },
        async mounted() {
          await this.getBank()
          await this.getRecord()
        }
    };
</script>
