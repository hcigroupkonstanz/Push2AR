<script lang="ts">
  import browser from 'webextension-polyfill';

  let ip = '';
  let connectionStatus = false;

  // Mock function to simulate checking connection
  function checkConnection() {
      // Simulates a successful connection for any IP starting with '192' and failure otherwise
      console.log('checking connection');
      return ip.startsWith('192');
  }

  function setIP() {
      connectionStatus = checkConnection();
      browser.storage.sync.set({ 'push2ar_ip': ip });
  }

  async function getIP() {
      const storage = await browser.storage.sync.get('push2ar_ip');
      ip = storage['push2ar_ip'] || '';
      return storage['push2ar_ip'];
  }
  getIP();

</script>

<div class="root">
  <h1>Push2AR</h1>
  <div>Colibri Server Address</div>

  <div class="row">
    <input type="text" placeholder="{ip}" bind:value={ip} />
    <button on:click={setIP}>Set IP</button>
  </div>

  <!-- {#if connectionStatus !== undefined}
      <span class={connectionStatus ? 'success' : 'failure'}>
          {connectionStatus ? '✔️ Connection established' : '❌ Connection failed'}
      </span>
  {/if} -->
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .row {
    display: flex;
    flex-direction: row;
  }

  /* .success { color: green; }
  .failure { color: red; } */

</style>
