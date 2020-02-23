<template>
  <div class="v-layers">
    <v-popover offset="16">
      <VIconBtn title="图层">layers</VIconBtn>
      <template slot="popover">
        <div class="v-layers-box">
          <div class="v-layers-header">
            <div>图层</div>
            <VIconBtn @click="addLayer">add</VIconBtn>
          </div>
          <div class="v-layers-content">
            <draggable :disabled="true" handle=".handle" v-model="layers">
              <div slot="header" class="v-layer-item">
                <VLayerBg></VLayerBg>
              </div>
              <VLayerItem
                v-for="layer in layers"
                :key="layer.id"
                :active="layer === paper.project.activeLayer"
                :layer="layer"
                @click="activate(layer)"
                @toggleVisible="toggleVisible(layer)"
                @remove="remove(layer)"
              ></VLayerItem>
            </draggable>
          </div>
        </div>
      </template>
    </v-popover>
  </div>
</template>

<script>
import VIconBtn from "@/components/VIconBtn";
import VLayerItem from "@/components/VLayerItem";
import VLayerBg from "@/components/VLayerBg";
import draggable from "vuedraggable";
import paper from "paper";
import history from "@/utils/history";
import { LayerAction } from "@/utils/actions";
import { createLayer } from "@/utils/shared";
export default {
  components: {
    VIconBtn,
    VLayerItem,
    VLayerBg,
    draggable
  },
  data() {
    return {
      paper,
      layers: paper.project.layers
    };
  },
  mounted() {
    if (!paper.project.layers.length) {
      this.addLayer();
    }
  },
  methods: {
    addLayer() {
      const layer = createLayer();
      history.add(
        new LayerAction({
          project: paper.project,
          type: "add",
          layer
        })
      );
      layer.activate();
    },
    activate(layer) {
      layer.activate();
    },
    toggleVisible(layer) {
      layer.visible = !layer.visible;
    },
    remove(layer) {
      layer.remove();
      history.add(
        new LayerAction({
          project: paper.project,
          type: "remove",
          layer
        })
      );
    }
  }
};
</script>

<style>
.v-layers-box {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  background-color: white;
}
.v-layers-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
}
.v-layers-content {
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow: scroll;
}
</style>
