<template>
<div id="menu002001">
<Collapse v-model="value1">
        <Panel name="1">
            专票登记
            <div slot="content">
            <Form :model="formItem01" :label-width="80">
            <FormItem label="发票代码：">
            <Input v-model="fpdm" placeholder="输入发票代码" style="width: 300px" />
            </FormItem>
            <FormItem label="发票号码：">
            <Input v-model="fphm" placeholder="输入发票号码" style="width: 300px" />
            </FormItem>
            <FormItem label="开票日期：">
            <DatePicker type="date" placeholder="选择开票日期" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="开票金额：">
            <Input v-model="fpje" prefix="logo-usd" placeholder="发票不含税金额" style="width: 220px" />
            </FormItem>
            <FormItem label="发票类型：">
            <Select v-model="model1" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </FormItem>
            <FormItem label="入账日期：">
            <DatePicker type="month" placeholder="选择归集月份" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="">
            <Button type="primary">提交</Button>
            </FormItem>
            </Form>
            </div>
        </Panel>
        <Panel name="2">
            普票登记（电子发票）
            <div slot="content">
            <Form :model="formItem02" :label-width="80">
            <FormItem label="发票代码：">
            <Input v-model="fpdm" placeholder="输入发票代码" style="width: 300px" />
            </FormItem>
            <FormItem label="发票号码：">
            <Input v-model="fphm" placeholder="输入发票号码" style="width: 300px" />
            </FormItem>
            <FormItem label="开票日期：">
            <DatePicker type="date" placeholder="选择开票日期" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="检验码：">
            <Input v-model="fpje" prefix="logo-usd" placeholder="检验码后六位" style="width: 220px" />
            </FormItem>
            <FormItem label="发票类型：">
            <Select v-model="model1" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </FormItem>
            <FormItem label="入账日期：">
            <DatePicker type="month" placeholder="选择归集月份" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="">
            <Button type="primary">提交</Button>
            </FormItem>
            </Form>
            </div>
        </Panel>
    </Collapse>
<div>
<Row style="margin-top:30px;">
<Col>
    <v-table
            is-horizontal-resize
            style="width:100%"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :cell-edit-done="cellEditDone"
    >
    </v-table>
</Col>
</Row>
</div>
</div>
</template>

<script>
export default{
        data() {
            return {
                  tableData: [],
                    columns:  [
                             {field: 'fpdm', title:'发票代码', width: 150, titleAlign: 'center',columnAlign:'center',isEdit:false,
                              formatter: function (rowData,rowIndex,pagingIndex,field) {

                                   return `<span class='cell-edit-color'>${rowData[field]}</span>`;
                               },isResize:true},
                             {field: 'tel', title: '发票号码', width: 150, titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true}
                     ]
            }
        },
        methods:{

            // 单元格编辑回调
            cellEditDone(newValue,oldValue,rowIndex,rowData,field){

                this.tableData[rowIndex][field] = newValue;

                // 接下来处理你的业务逻辑，数据持久化等...
            }
        }
    }

</script>
