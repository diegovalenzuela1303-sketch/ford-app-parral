(function () {
  const config = window.APP_CONFIG;

  if (!config) {
    console.error("APP_CONFIG no existe");
    return;
  }

  if (!config.SUPABASE_URL) {
    console.error("Falta SUPABASE_URL");
    return;
  }

  if (!config.SUPABASE_ANON_KEY) {
    console.error("Falta SUPABASE_ANON_KEY");
    return;
  }

  if (!window.supabase) {
    console.error("La librería de Supabase no cargó");
    return;
  }

  window.db = window.supabase.createClient(
    config.SUPABASE_URL,
    config.SUPABASE_ANON_KEY
  );

  console.log("Supabase conectado correctamente");
})();
