import FromRender from 'vue3-form-render/lib/vue3-form-render.common';
import 'vue3-form-render/lib/vue3-form-render.css';
import './form-render.less';

import {useStore} from 'vuex';

export default {
  props: {
    currentComponent: Object
  },
  setup(props) {
    let globalProps;
    const {commit} = useStore();
    const changeProps = (payload) => {
      commit('changeProps', payload);
    }

    return () => {
      if (!props.currentComponent) return null;
      const {component, currentComponentSchema, type} = props.currentComponent;
      if (!currentComponentSchema) return null;
      globalProps = component.props;
      return (
        <div class="form-container">
          <FromRender
            schema={currentComponentSchema.schema}
            formData={globalProps}
            onOnChange={(e) => changeProps({...e, type})}
          />
        </div>
      );
    }
  }
}
