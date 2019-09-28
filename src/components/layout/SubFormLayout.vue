<template functional>
  <section class="form form__type__sub">
    <header class="form__header">
      <slot name="header">
        <div class="form__title">{{ props.title }}</div>
      </slot>
    </header>
    <main class="form__body">
      <slot></slot>
    </main>
    <footer class="form__footer">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>
