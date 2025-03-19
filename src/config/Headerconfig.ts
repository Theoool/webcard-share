
import useSettingsModleStore from "@/stores/counter-store";
// AI 服务提供商基础 URL 映射
interface BaseURLMap {
  [key: string]: string;
}

const baseURLMap: BaseURLMap = {
  openai: 'https://api.openai.com/v1',
  aliyun: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  siliconflow: 'https://api.siliconflow.cn/v1',
  custom: '',
};
export   function AIconfig(){
  const { model, apikey, BaseURl, setModel, setApikey, setBaseURl, resetSettings } = useSettingsModleStore();
  const  headers={
    'x-ai-model':model,
  'x-api-key':apikey,
  'x-ai-baseurl':BaseURl,
  }
  return headers
}
