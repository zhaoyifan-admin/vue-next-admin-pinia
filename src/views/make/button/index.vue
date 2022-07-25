<template>
  <div style="background-color: #ffffff;padding: 20px;width: 100%;height: 100%">
    <el-row class="mb-4">
      <rtdp-button>Default</rtdp-button>
      <rtdp-button type="primary">Primary</rtdp-button>
      <rtdp-button type="secondary">Secondary</rtdp-button>
      <rtdp-button type="success">Success</rtdp-button>
      <rtdp-button type="info">Info</rtdp-button>
      <rtdp-button type="warning">Warning</rtdp-button>
      <rtdp-button type="danger">Danger</rtdp-button>
    </el-row>
    <el-row class="mb-4 mt20">
      <rtdp-button plain>Plain</rtdp-button>
      <rtdp-button type="primary" plain>Primary</rtdp-button>
      <rtdp-button type="secondary" plain>Secondary</rtdp-button>
      <rtdp-button type="success" plain>Success</rtdp-button>
      <rtdp-button type="info" plain>Info</rtdp-button>
      <rtdp-button type="warning" plain>Warning</rtdp-button>
      <rtdp-button type="danger" plain>Danger</rtdp-button>
    </el-row>
    <el-row class="mb-4 mt20">
      <rtdp-button :icon="Search" circle />
      <rtdp-button type="primary" :icon="Edit" circle/>
      <rtdp-button type="secondary" :icon="Edit" circle />
      <rtdp-button type="success" :icon="Check" circle/>
      <rtdp-button type="info" :icon="Message" circle/>
      <rtdp-button type="warning" :icon="Star" circle/>
      <rtdp-button type="danger" :icon="Delete" circle/>
    </el-row>
    <el-row class="mb-4 mt20">
      <rtdp-button disabled>Default</rtdp-button>
      <rtdp-button type="primary" disabled>Primary</rtdp-button>
      <rtdp-button type="secondary" disabled>Secondary</rtdp-button>
      <rtdp-button type="success" disabled>Success</rtdp-button>
      <rtdp-button type="info" disabled>Info</rtdp-button>
      <rtdp-button type="warning" disabled>Warning</rtdp-button>
      <rtdp-button type="danger" disabled>Danger</rtdp-button>
    </el-row>

    <el-row class="mb-4 mt20">
      <rtdp-button plain disabled>Plain</rtdp-button>
      <rtdp-button type="primary" plain disabled>Primary</rtdp-button>
      <rtdp-button type="secondary" plain disabled>Secondary</rtdp-button>
      <rtdp-button type="success" plain disabled>Success</rtdp-button>
      <rtdp-button type="info" plain disabled>Info</rtdp-button>
      <rtdp-button type="warning" plain disabled>Warning</rtdp-button>
      <rtdp-button type="danger" plain disabled>Danger</rtdp-button>
    </el-row>
    <el-row class="mb-4 mt20">
      <rtdp-button type="primary" :icon="Edit"/>
      <rtdp-button type="primary" :icon="Share"/>
      <rtdp-button type="primary" :icon="Drtdpete"/>
      <rtdp-button type="primary" :icon="Search">Search</rtdp-button>
      <rtdp-button type="primary">
        Upload
        <el-icon class="el-icon--right">
          <Upload/>
        </el-icon>
      </rtdp-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>