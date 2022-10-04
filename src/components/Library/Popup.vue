<script setup>
    // This starter template is using Vue 3 <script setup> SFCs
    import { computePosition, offset, flip, arrow } from '@floating-ui/dom';
    import { ref, onMounted } from 'vue';
    const referenceRef = ref();
    const floatingRef = ref();
    const arrowRef = ref();
    const isHidden = ref(true);
    const props = defineProps({
      content: String,
      placement: {
        type: String,
        default: 'top',
      },
      click: {
        type: Boolean,
        default: false,
      },
      timeToHide: {
        type: Boolean,
        default: false,
      }
    });
    async function updateTootlip() {
      const postition = await computePosition(
        referenceRef.value,
        floatingRef.value,
        {
          placement: props.placement,
          middleware: [offset(8), flip(), arrow({ element: arrowRef.value })],
        }
      ).then(({ x, y, middlewareData, placement }) => {
        Object.assign(floatingRef.value.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
        const { x: arrowX, y: arrowY } = middlewareData.arrow;
        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];
    
        Object.assign(arrowRef.value.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '-4px',
        });
      });
    }
    onMounted(async () => {
      updateTootlip();
      console.log(props.click);
    });
    function show() {
      isHidden.value = false;
      updateTootlip();
    }
    function hide() {
      isHidden.value = true;
      updateTootlip();
    }
    function showAndHide() {
      show();
      if (props.timeToHide) {
        setTimeout(hide, 2000);
      }
      else {
        return;
      }
    }
    </script>
    
    <template>
      <div class="inline-block">
        <div
          class="inline-block"
          ref="referenceRef"
          @mouseenter="!props.click && show()"
          @mouseleave="!props.click && hide()"
          @click="props.click && showAndHide()"
        >
          <slot></slot>
        </div>
        <div
          ref="floatingRef"
          :class="[
            'absolute top-0 left-0 bg-rhino-100 text-rhino-900 px-3 py-2 ring-2 ring-rhino-400 z-10 font-base rounded-xl transition ease duration-300 w-64',
            isHidden && 'hidden',
          ]"
        >
          {{ props.content }}
          <div class="w-full grid grid-cols-2 gap-2 mt-4">
            <button class="btn-secondary">Нет</button>
            <button class="btn-primary">Да</button>
          </div>
          <div
            ref="arrowRef"
            class="absolute bg-rhino-400 h-[8px] w-[8px] rotate-45  "
          ></div>
        </div>
      </div>
    </template>
    