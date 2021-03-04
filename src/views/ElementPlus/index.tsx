import { defineComponent ,ref ,unref as $ } from 'vue'
import VButton from '@/packages/Form/components/Button/index.vue'
import VText from '@/packages/Form/components/Text/index.vue'
import VSelect from '@/packages/Form/components/Select/index.vue'

export default defineComponent({
  name: 'ElementPlusTest',
  setup() {
    const btn1 = ref<any>(null)
    const btn2 = ref<any>(null)
    const text1 = ref<any>(null)
    const select1 = ref<any>(null)
    let flag = false

    // 测试btn1
    const option1 = {
      value :'Pandora Button',
      click(){
        console.log('option1 click')
        console.log($(text1).getValue())
        $(btn2).setDisabled(!flag)
        flag = !flag 
      }
    }
     // 测试btn2
    const option2 = {
      type : 'danger',
      value :'Pandora Danger Button',
      click(){
        console.log('option2 click')
        $(text1).setValue('set input v')
        
        selectOp.data = [
          { name: 'aa', value: 'aa' },
          { name: 'bb', value: 'bb' },
          { name: 'cc', value: 'cc' },
        ] 
      }
    }

    const option3 = {
      id:'text_01',
      type :'text',
      value :'123',
      width: 210,
      disabled: false,
      clearable:true,
      show: true,
      placeholder: '请输入任务名称',
      input(e:any){
        console.log(e)
      }
    }

    let selectOp = {
      id :'select_01',
      type : 'select',
      value :'1',
      width : 150,
      disabled: false,
      multiple: false,
      clearable:true,
      placeholder: '请选择下拉列表',
      change: function(val: any) {
        console.log(val)
      },
      focus: function(val: any, origindata: any) {
        // console.log(val, origindata)
      },
      blur: function(val: any, origindata: any) {
      },
      data: [
        { name: '全部', value: '0' },
        { name: '未提交', value: '1' },
        { name: '已提交', value: '2' },
        { name: '查询中', value: '3' },
        { name: '已完成', value: '4' }
      ]
    }


    return () => (
      <>
        <p> <VButton option={option1} ref={btn1}/></p>
        <p> <VButton option={option2} ref={btn2}/></p>
        <p> <VText option={option3} ref={text1}/></p>
        <p>
          <VSelect option={selectOp}ref={select1}/>
        </p>
      </>
    )
  }
})