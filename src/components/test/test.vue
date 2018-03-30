<template>
  <p>hahahhahah
  </p>
</template>
<script>
export default {
  name:'test',
  data(){
    return{}
  },
  mounted(){
    this.$axios.post('/user/register?userName=cat&userPassword=cat&roleName=student')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    }

  }

</script>
