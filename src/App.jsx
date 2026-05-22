function Layout() {
  const location = useLocation()
  const isKanat = location.pathname.startsWith('/kanat')
  const isGoldenFeather = location.pathname.startsWith('/golden-feather')
  const hideLayout = isKanat || isGoldenFeather

  return (
    <>
      {!hideLayout && <Navbar />}
      <PageTransition>
        <main>
          <AppRouter />
        </main>
      </PageTransition>
      {!hideLayout && <Footer />}
    </>
  )
}