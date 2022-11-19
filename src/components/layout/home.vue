<template>
  <div>
    <Head />
    <router-view/>
    <Foot />
  </div>
</template>

<script>
import Head from '@/components/layout/pageHeader'
import Foot from '@/components/layout/pageFooter'
export default {
  name:'index',
  components: { Head, Foot }
}
</script>

<style>

</style>