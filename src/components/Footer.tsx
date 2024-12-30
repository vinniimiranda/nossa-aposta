import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary py-8 text-primary-foreground">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold">BolãoMaster</h3>
            <p>Transformando apostas em diversão desde 2023.</p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Siga-nos</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-secondary">
                Facebook
              </Link>
              <Link href="#" className="hover:text-secondary">
                Twitter
              </Link>
              <Link href="#" className="hover:text-secondary">
                Instagram
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 BolãoMaster. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
