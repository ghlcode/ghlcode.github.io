<CustomLayout>
  <GenericContainer>
    <section class="page-404-wrapper">
      <div class="content">
        <h1>404</h1>
        <p>Oops! Page does not exist.</p>
        <div class="xicon-container">Go Home</div>
      </div>
    </section>
  </GenericContainer>
</CustomLayout>

<script lang="ts" setup>
import GenericContainer from '@components/GenericContainer/index.vue'
import { useThemeLocaleData } from '@composables/index.js'
</script>

<style lang="postcss">
.page-404-wrapper {
  @apply bg-reco-primary;
}
</style>
