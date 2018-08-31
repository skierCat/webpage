<template>
  <div id="app">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from './components/member_Loginpage'
export default {
  name: 'app',
  components: {
    'LoginForm': LoginForm
  }
}
</script>
