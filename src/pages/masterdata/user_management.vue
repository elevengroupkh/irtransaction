<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="User"
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
          <q-btn @click="addnew()" outline color="primary" label="Add New" class="q-mr-xs"/>

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
            <span v-if="edit==false">Add new User</span>
            <span v-if="edit==true">Edit User</span>
            <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-spinner
            color="primary"
            size="3em"
            v-if="loadingdata"
          />
          <q-form class="q-gutter-md" v-if="!loadingdata">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Firstname</q-item-label>
                  <q-input dense outlined v-model="customer.firstname"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Lastname</q-item-label>
                  <q-input dense outlined v-model="customer.lastname"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Username</q-item-label>
                  <q-input dense outlined v-model="customer.email"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Password</q-item-label>
                  <q-input dense outlined v-model="customer.password"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">ID</q-item-label>
                  <q-input dense outlined v-model="customer.emp_id"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Position</q-item-label>
                  <q-select v-model="position"
                    :options="positionoptions"
                    option-value="id"
                    option-label="name"
                    map-options
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Shift</q-item-label>
                  <q-select v-model="shift"
                    :options="shiftoptions"
                    option-value="id"
                    option-label="name"
                    map-options
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Role</q-item-label>
                  <q-select v-model="role"
                    :options="roleoptions"
                    option-value="id"
                    option-label="name"
                    map-options
                  />
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
                  active : true,
                  firstname : '',
                  lastname : '',
                  email : '',
                  emp_id : ''
                },
                new_customer: false,
                mode: "list",
                columns: [
                    {
                        name: "firstname",
                        required: true,
                        label: "Firstname",
                        align: "left",
                        field: "firstname",
                        sortable: true
                    },
                    {
                        name: "lastname",
                        required: true,
                        label: "Lastname",
                        align: "left",
                        field: "lastname",
                        sortable: true
                    },
                    {
                        name: "username",
                        required: true,
                        label: "Username",
                        align: "left",
                        field: "email",
                        sortable: true
                    },
                    {
                        name: "position",
                        required: true,
                        label: "Position",
                        align: "left",
                        field: "position_name",
                        sortable: true
                    },
                    {
                        name: "shift",
                        required: true,
                        label: "Shift",
                        align: "left",
                        field: "shift_name",
                        sortable: true
                    },
                    {
                        name: "role",
                        required: true,
                        label: "Role",
                        align: "left",
                        field: "role_name",
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
                positionoptions : [],
                position : '',
                shiftoptions : [],
                shift : '',
                roleoptions : [],
                role : '',
                loadingdata : false,
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

                const status = exportFile("user-management.csv", content, "text/csv");

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
            async getData() {
              this.loadingdata = true
              await this.getShift()
              await this.getPosition()
              await this.getRole()
              this.loadingdata = false
            },
            async addnew() {
              this.edit = false;
              this.loadingdata = true
              this.new_customer=true
              await this.getData()
              this.customer={active : true};

            },
            async deleteRecord (id) {
              await this.$axios.delete('api/user_manage/'+this.deleteid)
              .then((response)=>{
                this.getRecord()
              })
            },
            async editRecord() {
              this.loading = true
              try{
                this.customer.position = this.position.id
              }catch{
                this.customer.position = ''
              }
              try{
                this.customer.shift = this.shift.id
              }catch{
                this.customer.shift = ''
              }
              try{
                this.customer.role = this.role.id
              }catch{
                this.customer.role = ''
              }
              await this.$axios.put('api/user_manage/'+this.editid, this.customer)
              .then((response)=>{
                this.getRecord()
              })
            },
            async editRowRecord(row) {
              this.edit = true
              this.loadingdata = true
              this.new_customer=true
              await this.getData()
              this.customer.firstname = row.firstname
              this.customer.lastname = row.lastname
              this.customer.emp_id = row.emp_id
              this.customer.email = row.email
              this.customer.active = row.active
              this.position = this.positionoptions.filter(e => e.id == row.position_id)[0]
              this.shift = this.shiftoptions.filter(e => e.id == row.shift_id)[0]
              this.role = this.roleoptions.filter(e => e.id == row.role_id)[0]
              this.editid = row.id
            },
            async addRecord() {
              this.customer.position = this.position.id
              this.customer.shift = this.shift.id
              this.customer.role = this.role.id
              await this.$axios.post('api/user_manage', this.customer)
              .then((response)=>{
                this.getRecord()
                //this.data = response.data
                //console.log(response)
              })
            },
            async getRecord() {
              this.loading = true
              await this.$axios.get('api/user_manage')
              .then((response)=>{
                this.data = response.data
                this.loading = false
              })
            },
            async getPosition() {
              await this.$axios.get('api/position')
              .then((response)=>{
                this.positionoptions = response.data
              })
            },
            async getShift() {
              await this.$axios.get('api/shift')
              .then((response)=>{
                this.shiftoptions = response.data
              })
            },
            async getRole() {
              await this.$axios.get('api/role')
              .then((response)=>{
                this.roleoptions = response.data
              })
            },
        },
        async mounted() {

          await this.getRecord()
        }
    };
</script>
