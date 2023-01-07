<template>
  <ol>
    <li head on="1">User</li>
    <li head on="2">Page</li>
    <li head on="3">Service Worker</li>
    <li head on="4">Server</li>
    <li head on="5">Push Service</li>

    <li from="1" to="4">Navigation</li>
    <li back from="4" to="2">Page Load</li>
    <li from="2" to="3">register()</li>

    <li on="3">Register Push Handler</li>
    <li on="3">Register Notification Click Handler</li>
    <li back from="3" to="2">success</li>
    <li back from="2" to="1">Notification Permission Prompt</li>
    <li on="3">Worker is suspended</li>
    <li on="1">permission granted</li>
    <li from="1" to="2">success</li>
    <li on="2">endpoint and key generated</li>
    <li from="2" to="4">send endpoint & key</li>
    <li on="2">page blur or closed</li>
    <li break>*time passes*</li>
    <li on="4">event!</li>
    <li from="4" to="5">send message</li>
    <li back from="5" to="3">push event</li>
    <li on="3">worker is resumed</li>
    <li back from="3" to="1">display notification</li>
    <li on="1">click on notification</li>
    <li from="1" to="3">notificationclick event</li>
    <li back from="3" to="1">focus tab / open page</li>
  </ol>
</template>

<style>
html {
  font-size: calc(1vw + 0.5rem);
}
body {
  font-family: sans-serif;
  margin: 1em;
}
.note {
  text-align: center;
  font-style: italic;
}
@supports (display: grid) {
  ol {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    list-style-type: none;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='121' height='10'><rect x='60' y='0' width='1' height='10'/></svg>");
    background-size: calc(100% / 5) auto;
    background-position: top left;
    position: relative;
  }
  li {
    margin: 1em 0 1em;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  li[on] {
    border: 1px solid black;
    background: #fff;
    margin: 0.3em 1em;
    padding: 0.25em 0.25em 0.1em 0.25em;
  }
  li[from] {
    background: linear-gradient(
      to top,
      #fff 0px,
      #000 0px,
      #000 0.1em,
      #fff 0.1em
    );
    background-size: calc(100% - 8px) 100%;
    background-repeat: no-repeat;
    background-position: center top;
    padding: 0.3em 0 0.4em;
    margin-left: 4px;
    margin-right: 4px;
    position: relative;
  }
  li[from]:after {
    content: "";
    display: block;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' ><path d='M5,0 L10,5 5,10z'/></svg>");
    background-repeat: no-repeat;
    width: 0.75em;
    height: 0.75em;
    position: absolute;
    bottom: 0;
    right: 0px;
    transform: translateY(calc(50% - 0.05em));
  }
  li[break] {
    grid-column: 1/11;
    margin: 1em 2em;
    background: #fff;
    padding: 1em 0;
    border-top: 1px dashed black;
    border-bottom: 1px dashed black;
    text-align: center;
  }
  li[back]:after {
    transform: translateY(calc(50% - 0.05em)) scale(-1, 1);
    left: 0px;
  }

  [head] {
    grid-row: 1/1;
  }

  [from="1"] {
    grid-column-start: 2;
  }
  [to="1"] {
    grid-column-end: 2;
  }
  [on="1"] {
    grid-column: 1 / 3;
  }

  [from="2"] {
    grid-column-start: 4;
  }
  [to="2"] {
    grid-column-end: 4;
  }
  [on="2"] {
    grid-column: 3 / 5;
  }

  [from="3"] {
    grid-column-start: 6;
  }
  [to="3"] {
    grid-column-end: 6;
  }
  [on="3"] {
    grid-column: 5 / 7;
  }

  [from="4"] {
    grid-column-start: 8;
  }
  [to="4"] {
    grid-column-end: 8;
  }
  [on="4"] {
    grid-column: 7 / 9;
  }

  [from="5"] {
    grid-column-start: 10;
  }
  [to="5"] {
    grid-column-end: 10;
  }
  [on="5"] {
    grid-column: 9 / 11;
  }
}
</style>
