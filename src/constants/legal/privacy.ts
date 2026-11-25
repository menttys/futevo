import type { LegalDocument } from "@/@types/futevo"

import type { LanguageCode } from "@/i18n/i18n"

export const PRIVACY: Record<LanguageCode, LegalDocument> = {
  en: {
    title: "Privacy policy",
    updated: "24 November 2026",
    intro:
      "This policy explains what personal data Futevo collects, why, who we share it with and the rights you have. It applies to the Futevo mobile app and website.",
    sections: [
      {
        title: "Who is responsible for your data",
        blocks: [
          {
            type: "p",
            text: "The data controller is the Futevo developer. Contact: futeve-contact@furlany.dev.",
          },
        ],
      },
      {
        title: "The data we collect",
        blocks: [
          {
            type: "ul",
            items: [
              "Account data: your email address, name, profile photo (if you add one or sign in with Google) and an account identifier. If you use a password it is stored by our authentication provider in hashed form; we never see it.",
              "Players and teams you add: names, photos, countries, club and team names.",
              "Match data: scores, each point (who scored, landing zone, attack type), times, sets, tournaments and the statistics calculated from them.",
              "Settings: language, default scoring rules, menu and display preferences.",
              "Technical data: device and browser type, app version, IP address, time stamps and error logs, created when you use the service.",
            ],
          },
          {
            type: "p",
            text: "We do not collect precise location, contacts, payment data or special categories of data such as health data.",
          },
        ],
      },
      {
        title: "Why we use it and our legal basis",
        blocks: [
          {
            type: "ul",
            items: [
              "To create and run your account and provide Futevo’s features (keep score, save and sync matches, show statistics). Legal basis: performance of our contract with you (Art. 6(1)(b) GDPR).",
              "To store data about other players you add. Legal basis: our legitimate interest and yours in recording matches you play (Art. 6(1)(f)); you must have their permission, see below.",
              "To keep Futevo secure, prevent abuse and fix errors. Legal basis: legitimate interests (Art. 6(1)(f)).",
              "To improve Futevo using aggregated usage information. Legal basis: legitimate interests, or your consent where the law requires it (Art. 6(1)(a)).",
              "To send you important service messages (security, changes to terms). Legal basis: contract and legal obligation (Art. 6(1)(c)).",
              "To meet legal obligations and respond to authorities. Legal basis: legal obligation.",
            ],
          },
          {
            type: "p",
            text: "We do not sell your data, use it for advertising or make automated decisions with legal or similar effects about you.",
          },
        ],
      },
      {
        title: "Data about other people",
        blocks: [
          {
            type: "p",
            text: "If you add someone as a player, you are responsible for having told them and having their permission. Players who do not have an account can ask us at futeve-contact@furlany.dev to see, correct or delete data about them, and we will remove it.",
          },
        ],
      },
      {
        title: "Who we share it with",
        blocks: [
          {
            type: "ul",
            items: [
              "Google (Firebase Authentication, Cloud Firestore, Cloud Storage and hosting) stores and processes data on our behalf as our processor, under the Firebase Data Processing and Security Terms.",
              "People you choose to share matches, tournaments or results with.",
              "Authorities, when the law requires it.",
              "A buyer or successor if Futevo is reorganised or sold, under this policy.",
            ],
          },
        ],
      },
      {
        title: "International transfers",
        blocks: [
          {
            type: "p",
            text: "Our providers may process data outside the European Economic Area, including in the United States. When they do, the transfer is protected by the European Commission’s Standard Contractual Clauses and, where applicable, the EU–US Data Privacy Framework. You can ask us for a copy of these safeguards.",
          },
        ],
      },
      {
        title: "How long we keep it",
        blocks: [
          {
            type: "ul",
            items: [
              "Account, players and matches: while your account is active.",
              "After you delete your account: removed within 30 days, and from backups within 90 days.",
              "Technical logs: up to 90 days, unless needed to investigate a security incident.",
              "Data we must keep by law: for the period the law requires.",
            ],
          },
        ],
      },
      {
        title: "Your rights",
        blocks: [
          {
            type: "p",
            text: "You can ask to access, correct, delete, restrict or receive a copy of your data (portability), and object to processing based on legitimate interests. Where we rely on consent, you can withdraw it at any time. Many of these you can do yourself in the app (edit profile, export matches, delete account); for anything else write to futeve-contact@furlany.dev. We reply within one month.",
          },
          {
            type: "p",
            text: "You can also complain to a data protection authority. In Spain this is the Agencia Española de Protección de Datos (www.aepd.es); you can also contact the authority where you live or work.",
          },
        ],
      },
      {
        title: "Children",
        blocks: [
          {
            type: "p",
            text: "Futevo is not intended for children under 14 without the consent of a parent or guardian. If we learn that we hold an account of a child under 14 without that consent, we will delete it.",
          },
        ],
      },
      {
        title: "Security",
        blocks: [
          {
            type: "p",
            text: "Data is encrypted in transit and at rest by our providers, access is restricted and protected by authentication, and we review our security regularly. No system is completely secure; if a breach affects you, we will tell you and the authorities as the law requires.",
          },
        ],
      },
      {
        title: "Cookies and local storage",
        blocks: [
          {
            type: "p",
            text: "The website only uses storage that is strictly necessary: to keep you signed in, remember your settings (such as language and whether the menu is open) and keep scores safe while offline. We do not use advertising or tracking cookies.",
          },
        ],
      },
      {
        title: "Changes to this policy",
        blocks: [
          {
            type: "p",
            text: "We may update this policy. We will show the date of the latest version at the top and tell you in the app or by email about important changes.",
          },
        ],
      },
      {
        title: "Contact",
        blocks: [
          {
            type: "p",
            text: "Privacy questions: futeve-contact@furlany.dev.",
          },
        ],
      },
    ],
  },
  es: {
    title: "Política de privacidad",
    updated: "24 de noviembre de 2026",
    intro:
      "Esta política explica qué datos personales recoge Futevo, por qué, con quién los compartimos y qué derechos tienes. Se aplica a la app móvil y al sitio web de Futevo.",
    sections: [
      {
        title: "Quién es responsable de tus datos",
        blocks: [
          {
            type: "p",
            text: "El responsable del tratamiento es el desarrollador de Futevo. Contacto: futeve-contact@furlany.dev.",
          },
        ],
      },
      {
        title: "Los datos que recogemos",
        blocks: [
          {
            type: "ul",
            items: [
              "Datos de la cuenta: tu correo electrónico, nombre, foto de perfil (si la añades o inicias sesión con Google) y un identificador de cuenta. Si usas contraseña, nuestro proveedor de autenticación la guarda cifrada; nosotros nunca la vemos.",
              "Jugadores y equipos que añades: nombres, fotos, países, nombres de clubes y de equipos.",
              "Datos de partidos: resultados, cada punto (quién anotó, zona de caída, tipo de ataque), horas, sets, torneos y las estadísticas calculadas a partir de ellos.",
              "Ajustes: idioma, reglas de puntuación por defecto, preferencias de menú y de visualización.",
              "Datos técnicos: tipo de dispositivo y de navegador, versión de la app, dirección IP, marcas de tiempo y registros de errores, generados al usar el servicio.",
            ],
          },
          {
            type: "p",
            text: "No recogemos ubicación precisa, contactos, datos de pago ni categorías especiales de datos, como datos de salud.",
          },
        ],
      },
      {
        title: "Para qué los usamos y base legal",
        blocks: [
          {
            type: "ul",
            items: [
              "Para crear y gestionar tu cuenta y ofrecer las funciones de Futevo (llevar el marcador, guardar y sincronizar partidos, mostrar estadísticas). Base legal: ejecución del contrato contigo (art. 6.1.b RGPD).",
              "Para guardar datos de otros jugadores que añades. Base legal: nuestro interés legítimo y el tuyo en registrar los partidos que juegas (art. 6.1.f); debes contar con su permiso, ver más abajo.",
              "Para mantener Futevo seguro, evitar abusos y corregir errores. Base legal: intereses legítimos (art. 6.1.f).",
              "Para mejorar Futevo con información de uso agregada. Base legal: intereses legítimos, o tu consentimiento cuando la ley lo exija (art. 6.1.a).",
              "Para enviarte mensajes importantes del servicio (seguridad, cambios en las condiciones). Base legal: contrato y obligación legal (art. 6.1.c).",
              "Para cumplir obligaciones legales y atender a las autoridades. Base legal: obligación legal.",
            ],
          },
          {
            type: "p",
            text: "No vendemos tus datos, no los usamos para publicidad ni tomamos decisiones automatizadas con efectos jurídicos o similares sobre ti.",
          },
        ],
      },
      {
        title: "Datos de otras personas",
        blocks: [
          {
            type: "p",
            text: "Si añades a alguien como jugador, eres responsable de haberle informado y de contar con su permiso. Los jugadores que no tienen cuenta pueden escribirnos a futeve-contact@furlany.dev para ver, corregir o eliminar sus datos, y los eliminaremos.",
          },
        ],
      },
      {
        title: "Con quién los compartimos",
        blocks: [
          {
            type: "ul",
            items: [
              "Google (Firebase Authentication, Cloud Firestore, Cloud Storage y hosting) almacena y trata datos por cuenta nuestra como encargado del tratamiento, conforme a los Términos de Tratamiento y Seguridad de Datos de Firebase.",
              "Las personas con las que decidas compartir partidos, torneos o resultados.",
              "Las autoridades, cuando la ley lo exija.",
              "Un comprador o sucesor si Futevo se reorganiza o se vende, conforme a esta política.",
            ],
          },
        ],
      },
      {
        title: "Transferencias internacionales",
        blocks: [
          {
            type: "p",
            text: "Nuestros proveedores pueden tratar datos fuera del Espacio Económico Europeo, incluido Estados Unidos. En ese caso, la transferencia está protegida por las Cláusulas Contractuales Tipo de la Comisión Europea y, cuando corresponda, por el Marco de Privacidad de Datos UE–EE. UU. Puedes pedirnos una copia de estas garantías.",
          },
        ],
      },
      {
        title: "Cuánto tiempo los conservamos",
        blocks: [
          {
            type: "ul",
            items: [
              "Cuenta, jugadores y partidos: mientras tu cuenta esté activa.",
              "Tras eliminar tu cuenta: se borran en 30 días, y de las copias de seguridad en 90 días.",
              "Registros técnicos: hasta 90 días, salvo que se necesiten para investigar un incidente de seguridad.",
              "Datos que debemos conservar por ley: durante el plazo que la ley exija.",
            ],
          },
        ],
      },
      {
        title: "Tus derechos",
        blocks: [
          {
            type: "p",
            text: "Puedes pedir acceder a tus datos, corregirlos, eliminarlos, limitar su tratamiento o recibir una copia (portabilidad), y oponerte al tratamiento basado en intereses legítimos. Cuando nos basamos en el consentimiento, puedes retirarlo en cualquier momento. Muchas de estas acciones puedes hacerlas tú mismo en la app (editar perfil, exportar partidos, eliminar cuenta); para cualquier otra, escribe a futeve-contact@furlany.dev. Respondemos en un mes.",
          },
          {
            type: "p",
            text: "También puedes presentar una reclamación ante una autoridad de protección de datos. En España es la Agencia Española de Protección de Datos (www.aepd.es); también puedes acudir a la autoridad del lugar donde vives o trabajas.",
          },
        ],
      },
      {
        title: "Menores",
        blocks: [
          {
            type: "p",
            text: "Futevo no está dirigido a menores de 14 años sin el consentimiento de un progenitor o tutor. Si sabemos que tenemos la cuenta de un menor de 14 años sin ese consentimiento, la eliminaremos.",
          },
        ],
      },
      {
        title: "Seguridad",
        blocks: [
          {
            type: "p",
            text: "Nuestros proveedores cifran los datos en tránsito y en reposo, el acceso está restringido y protegido por autenticación, y revisamos nuestra seguridad con regularidad. Ningún sistema es completamente seguro; si una brecha te afecta, te lo comunicaremos a ti y a las autoridades, como exige la ley.",
          },
        ],
      },
      {
        title: "Cookies y almacenamiento local",
        blocks: [
          {
            type: "p",
            text: "El sitio web solo usa almacenamiento estrictamente necesario: para mantener tu sesión iniciada, recordar tus ajustes (como el idioma y si el menú está abierto) y proteger los marcadores sin conexión. No usamos cookies publicitarias ni de seguimiento.",
          },
        ],
      },
      {
        title: "Cambios en esta política",
        blocks: [
          {
            type: "p",
            text: "Podemos actualizar esta política. Mostraremos la fecha de la última versión al principio y te avisaremos en la app o por correo de los cambios importantes.",
          },
        ],
      },
      {
        title: "Contacto",
        blocks: [
          {
            type: "p",
            text: "Consultas de privacidad: futeve-contact@furlany.dev.",
          },
        ],
      },
    ],
  },
  pt: {
    title: "Política de privacidade",
    updated: "24 de novembro de 2026",
    intro:
      "Esta política explica quais dados pessoais o Futevo coleta, por quê, com quem os compartilhamos e quais direitos você tem. Ela vale para o app móvel e o site do Futevo.",
    sections: [
      {
        title: "Quem é responsável pelos seus dados",
        blocks: [
          {
            type: "p",
            text: "O controlador dos dados é o desenvolvedor do Futevo. Contato: futeve-contact@furlany.dev.",
          },
        ],
      },
      {
        title: "Os dados que coletamos",
        blocks: [
          {
            type: "ul",
            items: [
              "Dados da conta: seu e-mail, nome, foto de perfil (se você adicionar uma ou entrar com o Google) e um identificador de conta. Se você usa senha, ela é guardada em formato criptografado pelo nosso provedor de autenticação; nós nunca a vemos.",
              "Jogadores e equipes que você adiciona: nomes, fotos, países, nomes de clubes e de equipes.",
              "Dados de partidas: placares, cada ponto (quem marcou, zona de queda, tipo de ataque), horários, sets, torneios e as estatísticas calculadas a partir deles.",
              "Configurações: idioma, regras de pontuação padrão, preferências de menu e de exibição.",
              "Dados técnicos: tipo de dispositivo e de navegador, versão do app, endereço IP, registros de data e hora e logs de erro, gerados quando você usa o serviço.",
            ],
          },
          {
            type: "p",
            text: "Não coletamos localização precisa, contatos, dados de pagamento nem categorias especiais de dados, como dados de saúde.",
          },
        ],
      },
      {
        title: "Por que usamos e a base legal",
        blocks: [
          {
            type: "ul",
            items: [
              "Para criar e gerenciar sua conta e oferecer os recursos do Futevo (marcar o placar, salvar e sincronizar partidas, mostrar estatísticas). Base legal: execução do contrato com você (art. 6(1)(b) do RGPD).",
              "Para guardar dados de outros jogadores que você adiciona. Base legal: nosso interesse legítimo e o seu em registrar as partidas que você joga (art. 6(1)(f)); você precisa ter a permissão deles, veja abaixo.",
              "Para manter o Futevo seguro, evitar abusos e corrigir erros. Base legal: interesses legítimos (art. 6(1)(f)).",
              "Para melhorar o Futevo com informações de uso agregadas. Base legal: interesses legítimos ou o seu consentimento quando a lei exigir (art. 6(1)(a)).",
              "Para enviar mensagens importantes do serviço (segurança, mudanças nos termos). Base legal: contrato e obrigação legal (art. 6(1)(c)).",
              "Para cumprir obrigações legais e responder às autoridades. Base legal: obrigação legal.",
            ],
          },
          {
            type: "p",
            text: "Não vendemos seus dados, não os usamos para publicidade nem tomamos decisões automatizadas com efeitos jurídicos ou semelhantes sobre você.",
          },
        ],
      },
      {
        title: "Dados de outras pessoas",
        blocks: [
          {
            type: "p",
            text: "Se você adiciona alguém como jogador, é responsável por tê-lo informado e por ter a permissão dele. Jogadores que não têm conta podem escrever para futeve-contact@furlany.dev para ver, corrigir ou apagar seus dados, e nós os removeremos.",
          },
        ],
      },
      {
        title: "Com quem compartilhamos",
        blocks: [
          {
            type: "ul",
            items: [
              "O Google (Firebase Authentication, Cloud Firestore, Cloud Storage e hospedagem) armazena e trata dados em nosso nome, como operador, conforme os Termos de Tratamento e Segurança de Dados do Firebase.",
              "As pessoas com quem você escolhe compartilhar partidas, torneios ou resultados.",
              "As autoridades, quando a lei exigir.",
              "Um comprador ou sucessor, se o Futevo for reorganizado ou vendido, conforme esta política.",
            ],
          },
        ],
      },
      {
        title: "Transferências internacionais",
        blocks: [
          {
            type: "p",
            text: "Nossos provedores podem tratar dados fora do Espaço Econômico Europeu, incluindo nos Estados Unidos. Nesse caso, a transferência é protegida pelas Cláusulas Contratuais-Padrão da Comissão Europeia e, quando aplicável, pelo Quadro de Privacidade de Dados UE–EUA. Você pode pedir uma cópia dessas garantias.",
          },
        ],
      },
      {
        title: "Por quanto tempo guardamos",
        blocks: [
          {
            type: "ul",
            items: [
              "Conta, jogadores e partidas: enquanto sua conta estiver ativa.",
              "Depois que você apagar a conta: removidos em até 30 dias, e dos backups em até 90 dias.",
              "Logs técnicos: até 90 dias, a menos que sejam necessários para investigar um incidente de segurança.",
              "Dados que somos obrigados a guardar por lei: pelo prazo que a lei exigir.",
            ],
          },
        ],
      },
      {
        title: "Seus direitos",
        blocks: [
          {
            type: "p",
            text: "Você pode pedir para acessar, corrigir, apagar, restringir ou receber uma cópia dos seus dados (portabilidade) e se opor ao tratamento baseado em interesses legítimos. Quando nos baseamos no consentimento, você pode retirá-lo a qualquer momento. Muitas dessas ações você mesmo faz no app (editar perfil, exportar partidas, apagar conta); para qualquer outra, escreva para futeve-contact@furlany.dev. Respondemos em até um mês.",
          },
          {
            type: "p",
            text: "Você também pode reclamar a uma autoridade de proteção de dados. Na Espanha é a Agencia Española de Protección de Datos (www.aepd.es); você também pode procurar a autoridade do lugar onde mora ou trabalha.",
          },
        ],
      },
      {
        title: "Crianças",
        blocks: [
          {
            type: "p",
            text: "O Futevo não é destinado a menores de 14 anos sem o consentimento de um responsável. Se soubermos que temos a conta de um menor de 14 anos sem esse consentimento, vamos apagá-la.",
          },
        ],
      },
      {
        title: "Segurança",
        blocks: [
          {
            type: "p",
            text: "Nossos provedores criptografam os dados em trânsito e em repouso, o acesso é restrito e protegido por autenticação, e revisamos nossa segurança regularmente. Nenhum sistema é completamente seguro; se uma violação afetar você, avisaremos você e as autoridades, conforme a lei exigir.",
          },
        ],
      },
      {
        title: "Cookies e armazenamento local",
        blocks: [
          {
            type: "p",
            text: "O site usa apenas o armazenamento estritamente necessário: para manter você conectado, lembrar suas configurações (como o idioma e se o menu está aberto) e manter os placares seguros quando estiver offline. Não usamos cookies de publicidade nem de rastreamento.",
          },
        ],
      },
      {
        title: "Mudanças nesta política",
        blocks: [
          {
            type: "p",
            text: "Podemos atualizar esta política. Mostraremos a data da versão mais recente no topo e avisaremos você no app ou por e-mail sobre mudanças importantes.",
          },
        ],
      },
      {
        title: "Contato",
        blocks: [
          {
            type: "p",
            text: "Dúvidas de privacidade: futeve-contact@furlany.dev.",
          },
        ],
      },
    ],
  },
}
