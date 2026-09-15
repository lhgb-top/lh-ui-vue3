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
  LhTimePicker,
  LhCascader,
  LhTag,
  LhBadge,
  LhAvatar,
  LhProgress,
  LhStatistic,
  LhDescriptions,
} from '~/components';
import '~/components/button/style/index.scss';
import '~/components/input/style/index.scss';
import '~/components/icon/style/index.scss';
import '~/components/tooltip/style/index.scss';
import '~/components/dialog/style/index.scss';
import '~/components/form/style/index.scss';
import '~/components/select/style/index.scss';
import '~/components/checkbox/style/index.scss';
import '~/components/radio/style/index.scss';
import '~/components/switch/style/index.scss';
import '~/components/input-number/style/index.scss';
import '~/components/slider/style/index.scss';
import '~/components/date-picker/style/index.scss';
import '~/components/time-picker/style/index.scss';
import '~/components/cascader/style/index.scss';
import '~/components/tag/style/index.scss';
import '~/components/badge/style/index.scss';
import '~/components/avatar/style/index.scss';
import '~/components/progress/style/index.scss';
import '~/components/statistic/style/index.scss';
import '~/components/descriptions/style/index.scss';
import '~/components/config-provider/style/index.scss';
import '~/theme/src/common/var.scss';
import '~/theme/src/common/var-dark.scss';
import './style.css';
export default { 
    extends: DefaultTheme, 
    enhanceApp({ app }: { app: App }) { 
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
      app.component('LhTimePicker', LhTimePicker);
      app.component('LhCascader', LhCascader);
      app.component('LhTag', LhTag);
      app.component('LhBadge', LhBadge);
      app.component('LhAvatar', LhAvatar);
      app.component('LhProgress', LhProgress);
      app.component('LhStatistic', LhStatistic);
      app.component('LhDescriptions', LhDescriptions);
    }
};