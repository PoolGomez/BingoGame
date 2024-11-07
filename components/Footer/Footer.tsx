
export function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center py-4 z-20">
        <div className="container mx-auto px-4">
          <p className="text-sm sm:text-base text-center text-secondary-foreground">
            &copy; <span id="year"></span> Todos los derechos reservados.
          </p>
          <p className="text-xs mt-1 text-center text-secondary-foreground">
            Desarrollado por{" "}
            <a
              href="https://github.com/PoolGomez"
              target="_blank"
              className="hover:text-red-500"
            >
              Pool Gomez
            </a>
          </p>
        </div>
      </footer>
  )
}
