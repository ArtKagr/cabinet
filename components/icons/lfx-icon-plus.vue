<template>
  <svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>Vector</title>
    <desc>Created using Figma</desc>
    <g id="Canvas" transform="translate(248 6970)">
      <g id="Vector">
        <use xlink:href="#path01_fill" transform="translate(-248 -6970)" fill="#8E9AAC" />
        <use xlink:href="#path11_fill" transform="translate(-248 -6970)" fill="#8E9AAC" />
      </g>
    </g>
    <defs>
      <path id="path01_fill" d="M 0 6L 16 6L 16 10L 0 10L 0 6Z" />
      <path id="path11_fill" d="M 6 16L 6 0L 10 0L 10 16L 6 16Z" />
    </defs>
  </svg>
</template>
<style lang="scss">
  #Vector {
    &:hover {
      use {
        fill: #3498db;
      }
    }
  }
</style>
