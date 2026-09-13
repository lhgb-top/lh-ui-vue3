import type { App } from 'vue';
import DefaultTheme from 'vitepress/theme';
import DemoBlock from '../components/DemoBlock.vue';
import {
  LhButton,
  LhInput,
  LhIcon,
  LhTooltip,
  LhDialog,
  LhForm,
  LhFormItem,
  LhSelect,
  LhCheckbox,
  LhCheckboxGroup,
  LhRadio,
  LhRadioGroup,
  LhConfigProvider,
  LhSwitch,
  LhInputNumber,
  LhSlider,
  LhDatePicker, 
} from '../../../packages/components';
import '../../../packages/components/button/style/index.scss';
import '../../../packages/components/input/style/index.scss';
import '../../../packages/components/icon/style/index.scss';
import '../../../packages/components/tooltip/style/index.scss';
import '../../../packages/components/dialog/style/index.scss';
import '../../../packages/components/form/style/index.scss';
import '../../../packages/components/select/style/index.scss';
import '../../../packages/components/checkbox/style/index.scss';
import '../../../packages/components/radio/style/index.scss';
import '../../../packages/components/switch/style/index.scss';
import '../../../packages/components/input-number/style/index.scss';
import '../../../packages/components/slider/style/index.scss';
import '../../../packages/components/date-picker/style/index.scss';
import '../../../packages/components/config-provider/style/index.scss';
import '../../../packages/theme/src/common/var.scss';
import '../../../packages/theme/src/common/var-dark.scss';
import './style.css';
export default { 
    extends: DefaultTheme, 
    enhanceApp({ app }) { 
      app.component('DemoBlock', DemoBlock);
      app.component('LhButton', LhButton);
      app.component('LhInput', LhInput); 
      app.component('LhIcon', LhIcon); 
      app.component('LhTooltip', LhTooltip); 
      app.component('LhDialog', LhDialog); 
      app.component('LhForm', LhForm); 
      app.component('LhFormItem', LhFormItem); 
      app.component('LhSelect', LhSelect); 
      app.component('LhCheckbox', LhCheckbox); 
      app.component('LhCheckboxGroup', LhCheckboxGroup); 
      app.component('LhRadio', LhRadio); 
      app.component('LhRadioGroup', LhRadioGroup); 
      app.component('LhConfigProvider', LhConfigProvider); 
      app.component('LhSwitch', LhSwitch); 
      app.component('LhInputNumber', LhInputNumber); 
      app.component('LhSlider', LhSlider); 
      app.component('LhDatePicker', LhDatePicker); 
    } 
};