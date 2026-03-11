(function () {

const config = window.APP_CONFIG;

if (!config || !config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
console.error("Falta configurar config.js");
return;
}

window.db = supabase.createClient(
config.SUPABASE_URL,
config.SUPABASE_ANON_KEY
);

})();
