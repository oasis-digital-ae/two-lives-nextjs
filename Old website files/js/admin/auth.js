async function requireLogin() {
  // Force Supabase to refresh session from storage
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    window.location.replace("/admin/login.html");
    return false;
  }

  return true;
}

// Catch logout while user is on dashboard
supabaseClient.auth.onAuthStateChange((event, session) => {
  if (!session) {
    window.location.replace("/admin/login.html");
  }
});
