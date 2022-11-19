<template>
  <quill-editor class="editor"
    v-model="content"
    ref="myQuillEditor"
    :options="editorOption"
    @blur="onEditorBlur($event)" 
    @focus="onEditorFocus($event)"
    @change="onEditorChange($event)">
  </quill-editor>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import { quillEditor } from 'vue-quill-editor'
 
export default {
  components: {
    quillEditor
  },
   props:[
      'content'
    ],
    watch:{
      // content(val){
      //   this.con === val
      //   console.log(val);
      // }
    },
    data() {
      return {
        editorOption:{},
      };
    },
    methods:{
        onEditorBlur(){
        },
        onEditorFocus(){//获得焦点事件
        },
        onEditorChange(e){//内容改变事件
          // this.content = e.text
          if (e) {
            this.$emit('changeEditorText',e)
          }
    }
    } 
}
</script>

<style scoped lang='less'>
.editor{
  height: 400px;
  /deep/.ql-container{
    height: 310px;
    border-radius: 0px 0px 4px 4px;
    border: 1px solid rgba(38,38,38,0.2);
  }
  /deep/.ql-toolbar{
    border-radius: 4px 4px 0 0;
    border: 1px solid rgba(38,38,38,0.2);
  }
}
</style>