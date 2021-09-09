<template>
  <q-page>
    <!--<div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'blue_dark':'bg-blue-8'" class="text-white">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Sales</div>
                <div class="text-h5">160</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="trending_up"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'green_dark':'bg-green-8'" class="text-white">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Goals</div>
                <div class="text-h5">140</div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="far fa-dot-circle"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section :class="$q.dark.isActive?'orange_dark':'bg-orange-9'" class="text-white">
            <div class="row">
              <div class="col-10">
                <div class="text-h6">% Change</div>
                <div class="text-h5">
                  <q-icon name="arrow_downward"/>
                  2%
                </div>
              </div>
              <div class="col-2">
                <q-icon size="62px" name="compare_arrows"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div>
      <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">Sales vs Goals
                <q-btn flat dense icon="fas fa-download" class="float-right" @click="SaveImage('bar')"
                       :color="!$q.dark.isActive? 'grey-8':'white'">
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>

            <q-separator inset></q-separator>

            <q-card-section>
              <IEcharts :option="barOptions" ref="bar" :resizable="true" style="height:220px"/>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">

          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">Market Share & Growth
                <q-btn flat dense icon="fas fa-download" class="float-right" @click="SaveImage('line')"
                       :color="!$q.dark.isActive? 'grey-8':'white'">
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>

            <q-separator inset></q-separator>

            <q-card-section>
              <IEcharts ref="line" :option="lineChartOption" :resizable="true" style="height:220px"/>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">

          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">Sales vs Quota
                <q-btn flat dense icon="fas fa-download" class="float-right" @click="SaveImage('gauge')"
                       :color="!$q.dark.isActive? 'grey-8':'white'">
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>

            </q-card-section>

            <q-separator inset></q-separator>

            <q-card-section>
              <IEcharts :option="gaugeOptions" ref="gauge" :resizable="true" style="height:220px"/>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card flat bordered class="">
          <q-card-section>
            <div class="text-h6">Key Competitors
              <q-btn flat dense icon="fas fa-download" class="float-right" @click="SaveImage('pie')"
                     :color="!$q.dark.isActive? 'grey-8':'white'">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <IEcharts ref="pie" :option="pieOptions" :resizable="true" style="height:270px"/>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <q-card flat bordered class="">
          <q-card-section>
            <div class="text-h6">Sales Pipeline by Sales Rep
              <q-btn flat dense icon="fas fa-download" class="float-right" @click="SaveImage('stack_bar')"
                     :color="!$q.dark.isActive? 'grey-8':'white'">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <IEcharts ref="stack_bar" :option="stackedBarOptions" :resizable="true" style="height:270px"/>
          </q-card-section>
        </q-card>
      </div>
    </div>-->
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-12">
        <q-card flat bordered class="bg-white">
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

            <<!--template v-slot:body-cell-no="props">
              <q-td :props="props">
                {{ props.rowIndex + 1 }}
              </q-td>
            </template>

            <template v-slot:body-cell-date="props">
              <q-td :props="props">
                {{ formatdatedate(props.row.created_at) }}
              </q-td>
            </template>

            <template v-slot:body-cell-cpname="props">
              <q-td :props="props">
                {{ props.row.create_by }}-{{ props.row.create_by_firstname }}
              </q-td>
            </template>

            <template v-slot:body-cell-timein="props">
              <q-td :props="props">
                {{ formatdatetime(props.row.created_at) }}
              </q-td>
            </template>

            <template v-slot:body-cell-timedone="props">
              <q-td :props="props">
                {{ formatdatetime(props.row.updated_at) }}
              </q-td>
            </template>

            <template v-slot:body-cell-channel="props">
              <q-td :props="props">
                MANUAL
              </q-td>
            </template>

            <template v-slot:body-cell-bank_name="props">
              <q-td :props="props">
                <span v-if="props.row.transaction_type=='cashin'">
                  {{ props.row.from_bank }}
                </span>
                <span v-if="props.row.transaction_type=='cashout'">
                  {{ props.row.to_bank }}
                </span>
              </q-td>
            </template>

            <template v-slot:body-cell-customer_account="props">
              <q-td :props="props">
                <span v-if="props.row.transaction_type=='cashin'">
                  {{ props.row.from_account_no }}
                </span>
                <span v-if="props.row.transaction_type=='cashout'">
                  {{ props.row.to_account_no }}
                </span>
              </q-td>
            </template>

            <template v-slot:body-cell-starlight_account_no="props">
              <q-td :props="props">
                <span v-if="props.row.transaction_type=='cashin'">
                  {{ props.row.to_company_account }}
                </span>
                <span v-if="props.row.transaction_type=='cashout'">
                  {{ props.row.from_company_account }}
                </span>
              </q-td>
            </template>

            <template v-slot:body-cell-transaction_process="props">
              <q-td :props="props">
                <span v-if="props.row.transaction_type=='cashin'">
                  CASH IN
                </span>
                <span v-if="props.row.transaction_type=='cashout'">
                  CASH OUT
                </span>
              </q-td>
            </template>

            <template v-slot:body-cell-transaction_method="props">
              <q-td :props="props">
                Player
              </q-td>
            </template>-->

            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-chip
                  :color="(props.row.status == 'Complete')?'green':(props.row.status == 'Pending'?'red':'grey')"
                  text-color="white"
                  dense
                  class="text-weight-bolder"
                  square
                  style="width: 85px"
                >
                  <span v-if="props.row.status=='Complete'">Complete</span>
                  <span v-if="props.row.status=='Cancel'">Cancel</span>
                  <span v-if="props.row.status=='Pending'">Pending</span>
                </q-chip>
              </q-td>
            </template>

            <template v-slot:top="props">
              <div class="q-table__title">All Activities</div>
              <div class="">
                <div class="row">
                  <div class="col-12">
                    <div class="row align-items-center">
                      <q-select
                        v-model="formsearch.reqType"
                        :options="reqtypeoptions"
                        option-value="name"
                        option-label="value"
                        filled
                        label="Type"
                        stack-label
                        style="width: 150px"
                      />

                      <q-select
                        v-model="formsearch.reqShift"
                        :options="shiftoptions"
                        option-value="id"
                        option-label="name"
                        filled
                        label="Shift"
                        stack-label
                        style="width: 200px"
                        class="q-mx-sm"
                        clearable
                      />


                    </div>
                  </div>
                </div>
                <div class="row text-right q-mt-md">
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
                        class="q-mx-sm"
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
      </div>
    </div>
  </q-page>
</template>

<script>
    import Vue from 'vue';
    import IEcharts from 'vue-echarts-v3/src/full.js';
    import {exportFile} from 'quasar';
    import { date } from 'quasar'

    Vue.component('IEcharts', IEcharts);

    function wrapCsvValue(val, formatFn) {
        let formatted = formatFn !== void 0
            ? formatFn(val)
            : val

        formatted = formatted === void 0 || formatted === null
            ? ''
            : String(formatted)

        formatted = formatted.split('"').join('""')

        return `"${formatted}"`
    }

    export default {
        data() {
            return {
                filter: '',
                mode: 'list',

                gaugeOptions: {
                    tooltip: {
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                    series: [
                        {
                            type: 'gauge',
                            name: "Sale",
                            detail: {formatter: '{value}%'},
                            data: [{value: 30}],
                            min: 0,
                            radius: '100%',
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: [[0.35, '#293c55'], [0.65, '#61a0a8'], [1, '#c23731']],
                                    width: 20
                                },
                            },

                        }
                    ]
                },
                columns: [
                    {
                        name: "no",
                        label: "No.",
                        align: "left",
                        field: "no",
                        sortable: true
                    },
                    {
                        name: "date",
                        label: "Date",
                        align: "left",
                        field: "date",
                        sortable: true
                    },
                    {
                        name: "shift",
                        label: "Shift",
                        align: "left",
                        field: "shift_name",
                        sortable: true
                    },
                    {
                        name: "cpname",
                        label: "CP Name and ID",
                        align: "left",
                        field: "cpname",
                        sortable: true
                    },
                    {
                        name: "ordernumber",
                        required: true,
                        label: "Order No",
                        align: "left",
                        field: "ordernumber",
                        sortable: true
                    },
                    {
                        name: "timein",
                        label: "Time-In",
                        align: "left",
                        field: "timein",
                        sortable: true
                    },
                    {
                        name: "timedone",
                        label: "Time-Done",
                        align: "left",
                        field: "timedone",
                        sortable: true
                    },
                    {
                        name: "channel",
                        label: "Channel",
                        align: "left",
                        field: "channel",
                        sortable: true
                    },
                    {
                        name: "username",
                        align: "left",
                        label: "IR Username",
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
                        name: "bank_name",
                        align: "left",
                        label: "Bank Name",
                        field: "bank_name",
                        sortable: true
                    },
                    {
                        name: "customer_account",
                        align: "left",
                        label: "Customer Account",
                        field: "customer_account",
                        sortable: true
                    },
                    {
                        name: "starlight_account_no",
                        align: "left",
                        label: "Starlight Account no",
                        field: "starlight_account_no",
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
                        name: "transaction_process",
                        align: "left",
                        label: "Transaction Process",
                        field: "transaction_process",
                        sortable: true
                    },
                    {
                        name: "transaction_method",
                        align: "left",
                        label: "Transaction Method",
                        field: "transaction_method",
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
                        name: "note",
                        align: "left",
                        label: "Cancel Code",
                        field: "note",
                        sortable: true
                    },
                ],
                data: [],
                pagination: {
                    rowsPerPage: 100
                },
                loading : true,
                formsearch : {
                  reqType : 'all',
                  reqStatus : 'all',
                  reqShift : '',
                  reqCreateDateFrom : date.formatDate(date.subtractFromDate(Date.now(), { days: 7}), 'YYYY-MM-DD'),
                  reqCreateDateTo : date.formatDate(Date.now(), 'YYYY-MM-DD'),
                },
                reqstatusoptions : ['all','requested','approved','cancelled'],
                reqtypeoptions : ['all','cashin','cashout'],
                shiftoptions : [],
            }
        },
        computed: {
            barOptions() {
                return {
                    grid: {
                        bottom: '20%',
                        left: '15%',
                        top: '3%'
                    },
                    legend: {
                        bottom: 0,
                        textStyle: {
                            color: this.$q.dark.isActive ? 'white' : '#676767'
                        }
                    },
                    tooltip: {},
                    dataset: {
                        dimensions: ['time_period', 'sale', 'goal'],
                        source: [
                            {time_period: 'Jan 2019', sale: 50, goal: 70},
                            {time_period: 'Feb 2019', sale: 80, goal: 75},
                            {time_period: 'Mar 2019', sale: 86, goal: 80},
                            {time_period: 'Apr 2019', sale: 72, goal: 85}
                        ]
                    },
                    xAxis: {
                        type: 'category',
                        // axisLabel: {
                        //     rotate: 45
                        // }
                        axisLabel: {
                            color: this.$q.dark.isActive ? 'white' : '#676767'
                        }
                    },
                    yAxis: {
                        // name: 'Goal',
                        // nameLocation: 'center',
                        // nameGap: 30,
                        // nameTextStyle:{
                        //     fontWeight: 'bold'
                        // }
                        axisLabel: {
                            color: this.$q.dark.isActive ? 'white' : '#676767'
                        }
                    },
                    series: [
                        {type: 'bar', name: 'Sales'},
                        {type: 'bar', name: 'Goals'}
                    ]
                }
            },
            lineChartOption() {
                return {
                    grid: {
                        bottom: '20%',
                        left: '15%',
                        top: '3%'
                    },
                    legend: {
                        bottom: 0,
                        textStyle: {
                            color: this.$q.dark.isActive ? 'white' : '#676767'
                        }
                    },
                    tooltip: {
                        // formatter:
                        //     function (param) {
                        //     console.log(param)
                        //     // return param.seriesName + '<br />' + param.name + ': ';
                        // }
                    },
                    dataset: {
                        dimensions: ['product_name', 'share', 'growth'],
                        source: [
                            {product_name: 'Product A', share: 20, growth: 25},
                            {product_name: 'Product B', share: 22, growth: 18},
                            {product_name: 'Product C', share: 40, growth: 45}
                        ]
                    },
                    xAxis: {
                        type: 'category',
                        // axisLabel: {
                        //     rotate: 45
                        // }
                        axisLabel: {
                            color: this.$q.dark.isActive ? 'white' : '#676767'
                        }
                    },
                    yAxis: {
                        axisLabel: {
                            formatter: function (value, index) {
                                return value + ' %'
                            },
                            color: this.$q.dark.isActive ? 'white' : '#676767'
                        }
                    },
                    series: [
                        {type: 'line', name: 'Share'},
                        {type: 'line', name: 'Growth'}
                    ]
                }
            },
            pieOptions() {
                return {
                    tooltip: {
                        show: true
                    },
                    legend: {
                        orient: 'horizontal',
                        bottom: 0,
                        width: 300,
                        textStyle: {
                            color: this.$q.dark.isActive ? 'white' : '#676767'
                        }
                    },
                    series: [
                        {
                            name: 'Competitor',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inner',
                                    formatter: function (param, index) {
                                        return param.value + ' %'
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            selectedMode: 'single',
                            data: [
                                {value: 40, name: 'Product 1', selected: true},
                                {value: 20, name: 'Competitor 1', selected: false},
                                {value: 15, name: 'Competitor 2', selected: false},
                                {value: 25, name: 'Competitor 3', selected: false},
                            ]
                        }
                    ]
                }
            },
            stackedBarOptions() {
                return {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer:
                            {
                                type: 'shadow'
                            },
                        backgroundColor: 'rgba(50,50,50,0.9)',

                    },
                    legend: {
                        bottom: 0,
                        textStyle: {
                            color: this.$q.dark.isActive ? 'white' : '#676767'
                        }
                    },
                    color: ['#3395dd', '#ed892d', '#34393b'],
                    // legend: {
                    //     y: "bottom",
                    //     data: [{name: 'Territory Sales', icon: 'circle'}, {
                    //         name: 'Remaining Nation Sales',
                    //         icon: 'circle'
                    //     }]
                    // },
                    grid:
                        {
                            bottom: '10%',
                            left: '15%',
                            top: '9%'
                        },
                    calculable: true,
                    xAxis:
                        {
                            type: 'value',
                            position:
                                'top',
                            axisLine:
                                {
                                    show: false
                                },
                            axisLabel: {
                                formatter: function (value, index) {
                                    return '$' + value;
                                },
                                color: this.$q.dark.isActive ? 'white' : '#676767'
                            }
                        },
                    yAxis: [
                        {
                            type: 'category',
                            data: ['Alex Morrow', 'Joanna Carter', 'Jimmy Joanna', 'Mack Hales'],
                            axisLabel: {
                                fontSize: 12,
                                color: this.$q.dark.isActive ? 'white' : '#676767'
                            }
                        }
                    ],
                    series:
                        [{
                            name: 'Qualification',
                            type: 'bar',
                            stack: 'A',
                            data: [300, 350, 400, 500]

                        }, {
                            name: 'Discovery',
                            type: 'bar',
                            stack: 'A',
                            data: [100, 180, 250, 300]

                        }, {
                            name: 'Quote',
                            type: 'bar',
                            stack: 'A',
                            data: [100, 120, 200, 220]

                        }]
                }
            }
        },
        methods: {
            SaveImage(type) {
                const linkSource = this.$refs[type].getDataURL();
                const downloadLink = document.createElement('a');
                document.body.appendChild(downloadLink);
                downloadLink.href = linkSource;
                downloadLink.target = '_self';
                downloadLink.download = type + '.png';
                downloadLink.click();
            },
            exportTable() {
                // naive encoding to csv format
                const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
                    this.data.map(row => this.columns.map(col => wrapCsvValue(
                        typeof col.field === 'function'
                            ? col.field(row)
                            : row[col.field === void 0 ? col.name : col.field],
                        col.format
                    )).join(','))
                ).join('\r\n')

                const status = exportFile(
                    'activity.csv',
                    content,
                    'text/csv'
                )

                if (status !== true) {
                    this.$q.notify({
                        message: 'Browser denied file download...',
                        color: 'negative',
                        icon: 'warning'
                    })
                }
            },
            formatdate(dateshow){
              return date.formatDate(dateshow, 'YYYY-MM-DD HH:mm:ss')
            },
            formatdatedate(dateshow){
              return date.formatDate(dateshow, 'DD-MMM-YY')
            },
            formatdatetime(dateshow){
              return date.formatDate(dateshow, 'hh:mm A')
            },
            async getRecord() {
              this.loading = true
              //this.formsearch.reqStatus = this.reqStatus
              let searchshift = ''
              try{
                if (typeof this.formsearch.reqShift.id != 'undefined'){
                  searchshift = this.formsearch.reqShift.id
                }
              }catch{
                searchshift = ''
              }


              await this.$axios.get('api/transaction?transaction_type='+this.formsearch.reqType+'&status='+this.formsearch.reqStatus+'&shift='+searchshift+'&startdate='+this.formsearch.reqCreateDateFrom+'&enddate='+this.formsearch.reqCreateDateTo+'&order=asc&active=1')
              .then((response)=>{
                this.data = response.data.transaction
                this.shiftoptions = response.data.shift

                this.data.forEach((element, index) => {
                  this.data[index].no = index+1
                  this.data[index].date = this.formatdatedate(this.data[index].created_at)
                  this.data[index].cpname = this.data[index].create_by+"-"+this.data[index].create_by_firstname
                  this.data[index].timein = this.formatdatetime(this.data[index].created_at)
                  this.data[index].timedone = this.formatdatetime(this.data[index].updated_at)
                  this.data[index].channel = 'MANUAL'
                  if (this.data[index].transaction_type=='cashin'){
                    this.data[index].bank_name = this.data[index].from_bank
                    this.data[index].customer_account = '\''+this.data[index].from_account_no
                    this.data[index].starlight_account_no = '\''+this.data[index].to_company_account
                    this.data[index].transaction_process = 'CASH IN'
                  }
                  if (this.data[index].transaction_type=='cashout'){
                    this.data[index].bank_name = this.data[index].to_bank
                    this.data[index].customer_account = '\''+this.data[index].to_account_no
                    this.data[index].starlight_account_no = '\''+this.data[index].from_company_account
                    this.data[index].transaction_process = 'CASH OUT'
                  }
                  this.data[index].transaction_method = 'Player'
                  if (this.data[index].status == 'approved'){
                    this.data[index].status = 'Complete'
                  }
                  if (this.data[index].status == 'cancelled'){
                    this.data[index].status = 'Cancel'
                  }
                  if (this.data[index].status == 'requested'){
                    this.data[index].status = 'Pending'
                  }
                })
                this.loading = false
              })
            },
        },
        async mounted() {
          //await this.getCompanyAccount()
          //await this.getBank()
          await this.getRecord()
        }
    }
</script>

<style scoped>
  .blue_dark {
    background-color: #082f56;
  }

  .green_dark {
    background-color: #084a0b;
  }

  .orange_dark {
    background-color: #64350e;
  }
</style>

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
