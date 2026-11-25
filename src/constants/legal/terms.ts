import type { LegalDocument } from "@/@types/futevo"

import type { LanguageCode } from "@/i18n/i18n"

export const TERMS: Record<LanguageCode, LegalDocument> = {
  en: {
    title: "Terms of service",
    updated: "24 November 2026",
    intro:
      "These terms explain the rules for using Futevo. Please read them together with our Privacy policy. By creating an account or using Futevo, you agree to them.",
    sections: [
      {
        title: "Who we are",
        blocks: [
          {
            type: "p",
            text: "Futevo is provided by [Operator legal name], [address], [tax ID / NIF] (“Futevo”, “we”, “us”). You can contact us at futeve-contact@furlany.dev.",
          },
        ],
      },
      {
        title: "What Futevo does",
        blocks: [
          {
            type: "p",
            text: "Futevo is an app for keeping score in futevolley. You can create matches and tournaments, add players and teams, record each point (who scored, where the ball landed and how) and see statistics. Futevo is available on mobile and on the web.",
          },
          {
            type: "p",
            text: "Futevo is currently in beta. Features may change, be added or be removed, and things may occasionally not work as expected.",
          },
        ],
      },
      {
        title: "Who can use Futevo",
        blocks: [
          {
            type: "p",
            text: "You must be at least 14 years old to create an account. If you are under the age of majority where you live, you need permission from a parent or guardian.",
          },
          { type: "p", text: "You can only use Futevo in line with these terms and the law." },
        ],
      },
      {
        title: "Your account",
        blocks: [
          {
            type: "ul",
            items: [
              "You can sign in with an email and password or with your Google account.",
              "Keep your login details safe and tell us straight away if you think someone else has used your account.",
              "You are responsible for what happens in your account.",
              "The information you give us must be accurate and kept up to date.",
            ],
          },
        ],
      },
      {
        title: "Your content and other people’s data",
        blocks: [
          {
            type: "p",
            text: "The matches, tournaments, players, photos and other information you add (“your content”) remain yours. You give us a non-exclusive, worldwide, royalty-free licence to store, copy, process and display your content only as needed to run Futevo and provide it to you and to the people you share it with.",
          },
          {
            type: "p",
            text: "When you add other people as players (for example their name, photo, country or results), you must have the right to do so, which normally means you have told them and they agree. Do not add photos or details of a child under 14 without permission from a parent or guardian. Anyone who appears in Futevo can ask us to remove their data at futeve-contact@furlany.dev.",
          },
          { type: "p", text: "We may remove content that breaks these terms or the law." },
        ],
      },
      {
        title: "Acceptable use",
        blocks: [
          { type: "p", text: "You must not:" },
          {
            type: "ul",
            items: [
              "use Futevo to harass, insult or harm anyone, or to publish illegal, offensive or misleading content;",
              "upload content you do not have the right to share;",
              "try to access other people’s accounts or data, or get around security or usage limits;",
              "copy, scrape, reverse engineer or overload the service, or use it to build a competing product;",
              "use Futevo for gambling or to manipulate results.",
            ],
          },
        ],
      },
      {
        title: "Our intellectual property",
        blocks: [
          {
            type: "p",
            text: "Futevo, its name, logo, the mark, design and software belong to us or our licensors. These terms do not give you any right to use them except to use the app as intended.",
          },
        ],
      },
      {
        title: "Price",
        blocks: [
          {
            type: "p",
            text: "Futevo is free during the beta. If we introduce paid features, we will tell you in advance and you will only pay if you choose to.",
          },
        ],
      },
      {
        title: "Availability and changes",
        blocks: [
          {
            type: "p",
            text: "We work to keep Futevo running and your data safe, but we cannot promise it will always be available, error-free or that data will never be lost. Keep your own copy of anything important; you can export your matches from Settings.",
          },
          {
            type: "p",
            text: "We may change or stop features. If we plan to shut down Futevo, we will give you at least 30 days’ notice and a way to export your data.",
          },
        ],
      },
      {
        title: "Liability",
        blocks: [
          {
            type: "p",
            text: "Nothing in these terms limits liability that cannot be limited by law, including for death or personal injury caused by negligence, fraud, or your rights as a consumer.",
          },
          {
            type: "p",
            text: "Otherwise, to the extent permitted by law, we are not liable for indirect or unforeseeable losses, or for losses caused by your content, your use of Futevo against these terms, or events outside our reasonable control. Futevo is a scoring tool: official results of any match or tournament are the responsibility of its organisers.",
          },
        ],
      },
      {
        title: "Suspension and ending your account",
        blocks: [
          {
            type: "p",
            text: "You can delete your account at any time in Settings. This deletes your account and your content as described in the Privacy policy.",
          },
          {
            type: "p",
            text: "We may suspend or close an account that seriously or repeatedly breaks these terms or the law. Where reasonable, we will tell you why and give you a chance to respond or export your data.",
          },
        ],
      },
      {
        title: "Changes to these terms",
        blocks: [
          {
            type: "p",
            text: "We may update these terms, for example when we add features or the law changes. For important changes we will tell you in the app or by email at least 15 days before they apply. If you do not agree, you can stop using Futevo and delete your account.",
          },
        ],
      },
      {
        title: "Law and disputes",
        blocks: [
          {
            type: "p",
            text: "These terms are governed by Spanish law. If you are a consumer, you also keep the protection of the mandatory laws of the country where you live, and you can bring a claim in the courts of your place of residence.",
          },
          {
            type: "p",
            text: "If something goes wrong, please contact us first at futeve-contact@furlany.dev and we will try to sort it out.",
          },
        ],
      },
      {
        title: "Contact",
        blocks: [
          { type: "p", text: "[Operator legal name], [address]. Email: futeve-contact@furlany.dev." },
        ],
      },
    ],
  },
  es: {
    title: "Condiciones del servicio",
    updated: "24 de noviembre de 2026",
    intro:
      "Estas condiciones explican las reglas para usar Futevo. Léelas junto con nuestra Política de privacidad. Al crear una cuenta o usar Futevo, las aceptas.",
    sections: [
      {
        title: "Quiénes somos",
        blocks: [
          {
            type: "p",
            text: "Futevo lo ofrece [Nombre legal del titular], [dirección], [NIF] («Futevo», «nosotros»). Puedes contactarnos en futeve-contact@furlany.dev.",
          },
        ],
      },
      {
        title: "Qué hace Futevo",
        blocks: [
          {
            type: "p",
            text: "Futevo es una app para llevar el marcador en el futvóley. Puedes crear partidos y torneos, añadir jugadores y equipos, registrar cada punto (quién anotó, dónde cayó la pelota y cómo) y ver estadísticas. Futevo está disponible en móvil y en la web.",
          },
          {
            type: "p",
            text: "Futevo está actualmente en beta. Las funciones pueden cambiar, añadirse o eliminarse, y a veces algo puede no funcionar como se espera.",
          },
        ],
      },
      {
        title: "Quién puede usar Futevo",
        blocks: [
          {
            type: "p",
            text: "Debes tener al menos 14 años para crear una cuenta. Si eres menor de edad según la ley de donde vives, necesitas el permiso de un progenitor o tutor.",
          },
          { type: "p", text: "Solo puedes usar Futevo conforme a estas condiciones y a la ley." },
        ],
      },
      {
        title: "Tu cuenta",
        blocks: [
          {
            type: "ul",
            items: [
              "Puedes iniciar sesión con correo y contraseña o con tu cuenta de Google.",
              "Mantén seguros tus datos de acceso y avísanos de inmediato si crees que otra persona ha usado tu cuenta.",
              "Eres responsable de lo que ocurra en tu cuenta.",
              "La información que nos des debe ser exacta y estar actualizada.",
            ],
          },
        ],
      },
      {
        title: "Tu contenido y los datos de otras personas",
        blocks: [
          {
            type: "p",
            text: "Los partidos, torneos, jugadores, fotos y demás información que añadas («tu contenido») siguen siendo tuyos. Nos concedes una licencia no exclusiva, mundial y gratuita para almacenar, copiar, tratar y mostrar tu contenido solo en la medida necesaria para ofrecer Futevo a ti y a las personas con las que lo compartas.",
          },
          {
            type: "p",
            text: "Cuando añades a otras personas como jugadores (por ejemplo su nombre, foto, país o resultados), debes tener derecho a hacerlo, lo que normalmente significa que se lo has dicho y están de acuerdo. No añadas fotos ni datos de un menor de 14 años sin permiso de un progenitor o tutor. Cualquier persona que aparezca en Futevo puede pedirnos que eliminemos sus datos en futeve-contact@furlany.dev.",
          },
          {
            type: "p",
            text: "Podemos eliminar contenido que incumpla estas condiciones o la ley.",
          },
        ],
      },
      {
        title: "Uso aceptable",
        blocks: [
          { type: "p", text: "No debes:" },
          {
            type: "ul",
            items: [
              "usar Futevo para acosar, insultar o dañar a nadie, ni para publicar contenido ilegal, ofensivo o engañoso;",
              "subir contenido que no tengas derecho a compartir;",
              "intentar acceder a cuentas o datos de otras personas, ni eludir la seguridad o los límites de uso;",
              "copiar, extraer datos masivamente, aplicar ingeniería inversa o sobrecargar el servicio, ni usarlo para crear un producto competidor;",
              "usar Futevo para apuestas o para manipular resultados.",
            ],
          },
        ],
      },
      {
        title: "Nuestra propiedad intelectual",
        blocks: [
          {
            type: "p",
            text: "Futevo, su nombre, logotipo, marca, diseño y software son nuestros o de nuestros licenciantes. Estas condiciones no te dan ningún derecho a usarlos, salvo para usar la app como está previsto.",
          },
        ],
      },
      {
        title: "Precio",
        blocks: [
          {
            type: "p",
            text: "Futevo es gratuito durante la beta. Si introducimos funciones de pago, te avisaremos con antelación y solo pagarás si lo decides.",
          },
        ],
      },
      {
        title: "Disponibilidad y cambios",
        blocks: [
          {
            type: "p",
            text: "Trabajamos para mantener Futevo en funcionamiento y tus datos seguros, pero no podemos prometer que esté siempre disponible, libre de errores ni que los datos nunca se pierdan. Guarda tu propia copia de lo importante; puedes exportar tus partidos desde Ajustes.",
          },
          {
            type: "p",
            text: "Podemos cambiar o dejar de ofrecer funciones. Si pensamos cerrar Futevo, te avisaremos con al menos 30 días de antelación y te daremos una forma de exportar tus datos.",
          },
        ],
      },
      {
        title: "Responsabilidad",
        blocks: [
          {
            type: "p",
            text: "Nada en estas condiciones limita la responsabilidad que la ley no permite limitar, incluida la derivada de muerte o lesiones personales causadas por negligencia, del fraude, ni tus derechos como consumidor.",
          },
          {
            type: "p",
            text: "Por lo demás, en la medida que la ley lo permita, no respondemos de pérdidas indirectas o imprevisibles, ni de las causadas por tu contenido, por tu uso de Futevo contraviniendo estas condiciones o por hechos ajenos a nuestro control razonable. Futevo es una herramienta de marcador: los resultados oficiales de cualquier partido o torneo son responsabilidad de sus organizadores.",
          },
        ],
      },
      {
        title: "Suspensión y cierre de tu cuenta",
        blocks: [
          {
            type: "p",
            text: "Puedes eliminar tu cuenta en cualquier momento en Ajustes. Esto elimina tu cuenta y tu contenido como se describe en la Política de privacidad.",
          },
          {
            type: "p",
            text: "Podemos suspender o cerrar una cuenta que incumpla de forma grave o reiterada estas condiciones o la ley. Cuando sea razonable, te explicaremos el motivo y te daremos la oportunidad de responder o exportar tus datos.",
          },
        ],
      },
      {
        title: "Cambios en estas condiciones",
        blocks: [
          {
            type: "p",
            text: "Podemos actualizar estas condiciones, por ejemplo cuando añadimos funciones o cambia la ley. Si el cambio es importante, te avisaremos en la app o por correo con al menos 15 días de antelación. Si no estás de acuerdo, puedes dejar de usar Futevo y eliminar tu cuenta.",
          },
        ],
      },
      {
        title: "Ley aplicable y conflictos",
        blocks: [
          {
            type: "p",
            text: "Estas condiciones se rigen por la ley española. Si eres consumidor, conservas además la protección de las normas imperativas del país donde vives y puedes reclamar ante los tribunales de tu lugar de residencia.",
          },
          {
            type: "p",
            text: "Si algo sale mal, escríbenos primero a futeve-contact@furlany.dev e intentaremos resolverlo.",
          },
        ],
      },
      {
        title: "Contacto",
        blocks: [
          {
            type: "p",
            text: "[Nombre legal del titular], [dirección]. Correo: futeve-contact@furlany.dev.",
          },
        ],
      },
    ],
  },
  pt: {
    title: "Termos de uso",
    updated: "24 de novembro de 2026",
    intro:
      "Estes termos explicam as regras para usar o Futevo. Leia-os junto com nossa Política de privacidade. Ao criar uma conta ou usar o Futevo, você concorda com eles.",
    sections: [
      {
        title: "Quem somos",
        blocks: [
          {
            type: "p",
            text: "O Futevo é oferecido por [Nome legal do operador], [endereço], [NIF] («Futevo», «nós»). Você pode falar conosco em futeve-contact@furlany.dev.",
          },
        ],
      },
      {
        title: "O que o Futevo faz",
        blocks: [
          {
            type: "p",
            text: "O Futevo é um app para marcar o placar no futevôlei. Você pode criar partidas e torneios, adicionar jogadores e equipes, registrar cada ponto (quem marcou, onde a bola caiu e como) e ver estatísticas. O Futevo está disponível no celular e na web.",
          },
          {
            type: "p",
            text: "O Futevo está em beta. Os recursos podem mudar, ser adicionados ou removidos, e às vezes algo pode não funcionar como esperado.",
          },
        ],
      },
      {
        title: "Quem pode usar o Futevo",
        blocks: [
          {
            type: "p",
            text: "Você precisa ter pelo menos 14 anos para criar uma conta. Se você é menor de idade no lugar onde mora, precisa da permissão de um responsável.",
          },
          { type: "p", text: "Você só pode usar o Futevo de acordo com estes termos e a lei." },
        ],
      },
      {
        title: "Sua conta",
        blocks: [
          {
            type: "ul",
            items: [
              "Você pode entrar com e-mail e senha ou com sua conta do Google.",
              "Mantenha seus dados de acesso seguros e avise-nos imediatamente se achar que outra pessoa usou sua conta.",
              "Você é responsável pelo que acontece na sua conta.",
              "As informações que você nos dá devem ser corretas e estar atualizadas.",
            ],
          },
        ],
      },
      {
        title: "Seu conteúdo e os dados de outras pessoas",
        blocks: [
          {
            type: "p",
            text: "As partidas, torneios, jogadores, fotos e demais informações que você adiciona («seu conteúdo») continuam sendo seus. Você nos concede uma licença não exclusiva, mundial e gratuita para armazenar, copiar, tratar e exibir seu conteúdo apenas na medida necessária para operar o Futevo e oferecê-lo a você e às pessoas com quem você o compartilha.",
          },
          {
            type: "p",
            text: "Ao adicionar outras pessoas como jogadores (por exemplo nome, foto, país ou resultados), você precisa ter o direito de fazê-lo, o que normalmente significa que as avisou e elas concordam. Não adicione fotos ou dados de menores de 14 anos sem a permissão de um responsável. Qualquer pessoa que apareça no Futevo pode pedir a remoção dos seus dados em futeve-contact@furlany.dev.",
          },
          {
            type: "p",
            text: "Podemos remover conteúdo que viole estes termos ou a lei.",
          },
        ],
      },
      {
        title: "Uso aceitável",
        blocks: [
          { type: "p", text: "Você não deve:" },
          {
            type: "ul",
            items: [
              "usar o Futevo para assediar, insultar ou prejudicar alguém, nem para publicar conteúdo ilegal, ofensivo ou enganoso;",
              "enviar conteúdo que você não tem o direito de compartilhar;",
              "tentar acessar contas ou dados de outras pessoas, nem contornar a segurança ou os limites de uso;",
              "copiar, extrair dados em massa, fazer engenharia reversa ou sobrecarregar o serviço, nem usá-lo para criar um produto concorrente;",
              "usar o Futevo para apostas ou para manipular resultados.",
            ],
          },
        ],
      },
      {
        title: "Nossa propriedade intelectual",
        blocks: [
          {
            type: "p",
            text: "O Futevo, seu nome, logotipo, marca, design e software pertencem a nós ou aos nossos licenciantes. Estes termos não lhe dão nenhum direito de usá-los, exceto para usar o app como previsto.",
          },
        ],
      },
      {
        title: "Preço",
        blocks: [
          {
            type: "p",
            text: "O Futevo é gratuito durante o beta. Se introduzirmos recursos pagos, avisaremos com antecedência e você só pagará se quiser.",
          },
        ],
      },
      {
        title: "Disponibilidade e mudanças",
        blocks: [
          {
            type: "p",
            text: "Trabalhamos para manter o Futevo no ar e seus dados seguros, mas não podemos prometer que ele estará sempre disponível, sem erros, nem que os dados nunca serão perdidos. Guarde sua própria cópia do que for importante; você pode exportar suas partidas em Configurações.",
          },
          {
            type: "p",
            text: "Podemos alterar ou encerrar recursos. Se planejarmos encerrar o Futevo, avisaremos com pelo menos 30 dias de antecedência e daremos uma forma de exportar seus dados.",
          },
        ],
      },
      {
        title: "Responsabilidade",
        blocks: [
          {
            type: "p",
            text: "Nada nestes termos limita a responsabilidade que a lei não permite limitar, inclusive por morte ou lesão corporal causadas por negligência, por fraude, nem seus direitos como consumidor.",
          },
          {
            type: "p",
            text: "No mais, na medida permitida por lei, não respondemos por perdas indiretas ou imprevisíveis, nem por perdas causadas pelo seu conteúdo, pelo uso do Futevo contrário a estes termos ou por eventos fora do nosso controle razoável. O Futevo é uma ferramenta de placar: os resultados oficiais de qualquer partida ou torneio são de responsabilidade dos organizadores.",
          },
        ],
      },
      {
        title: "Suspensão e encerramento da conta",
        blocks: [
          {
            type: "p",
            text: "Você pode apagar sua conta a qualquer momento em Configurações. Isso apaga sua conta e seu conteúdo, como descrito na Política de privacidade.",
          },
          {
            type: "p",
            text: "Podemos suspender ou encerrar uma conta que viole de forma grave ou repetida estes termos ou a lei. Quando razoável, explicaremos o motivo e daremos a você a chance de responder ou exportar seus dados.",
          },
        ],
      },
      {
        title: "Mudanças nestes termos",
        blocks: [
          {
            type: "p",
            text: "Podemos atualizar estes termos, por exemplo quando adicionamos recursos ou a lei muda. Em mudanças importantes, avisaremos no app ou por e-mail com pelo menos 15 dias de antecedência. Se você não concordar, pode parar de usar o Futevo e apagar sua conta.",
          },
        ],
      },
      {
        title: "Lei aplicável e disputas",
        blocks: [
          {
            type: "p",
            text: "Estes termos são regidos pela lei espanhola. Se você é consumidor, mantém também a proteção das normas obrigatórias do país onde mora e pode ajuizar ação nos tribunais do seu local de residência.",
          },
          {
            type: "p",
            text: "Se algo der errado, fale primeiro conosco em futeve-contact@furlany.dev e tentaremos resolver.",
          },
        ],
      },
      {
        title: "Contato",
        blocks: [
          {
            type: "p",
            text: "[Nome legal do operador], [endereço]. E-mail: futeve-contact@furlany.dev.",
          },
        ],
      },
    ],
  },
}
