<template>
  <v-app bg-color ="background">
   
    <v-container class="h-100 pa-0 interfaceContainer">
      
      <div class="navBar"> </div>
      <div class="previewWindow"></div>
      <div class="settingWindow"></div>
  
    </v-container>
  </v-app>
</template>

<script setup>
  
</script>

<style scoped>
.interfaceContainer{
  display: grid;
  margin: 20px auto;
  grid-template: 80px auto / 40% auto;
  gap: 20px;
}
.navBar{
  background: rgb(var(--v-theme-surface));
  border-radius: 8px;
  grid-column: 1 / span 2;
}
.previewWindow{
  background: rgb(var(--v-theme-surface));
  border-radius: 8px;
}
.settingWindow{
  background: rgb(var(--v-theme-surface));
  border-radius: 8px;
}

@media (max-width: 960px) {
  .navBar{
    margin: 0 20px;
  }
  .previewWindow{
    display: none;
  }
  .settingWindow{
    grid-column: 1 / span 2;
    margin: 0 20px;
  }
}
@media (max-width: 1264px) {
  .interfaceContainer{
    grid-template: 80px auto / 35% auto;
  }
  
}
</style>
