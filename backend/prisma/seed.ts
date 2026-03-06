import pg from 'pg';
const { Client } = pg;

async function main() {
  const client = new Client({
    connectionString: "postgresql://neondb_owner:npg_DIykHA3lqLf4@ep-weathered-rain-aiki3g7q-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
  });

  try {
    await client.connect();
    console.log('🚀 Conectado! Iniciando extração e carga das 8 coleções...');

    const collections = [
      {
        name: "Socioemocional",
        description: "Desenvolvimento de competências como autoconhecimento, autocontrole e empatia.",
        details: [
          { cycle: "Fundamental 1", themesPerVolume: "Identidade; Emoções; Amizade; Empatia; Cooperação.", methodologyFocus: "Lúdico e vivencial.", teacherGuidelines: "Focar em mediação e acolhimento emocional." },
          { cycle: "Fundamental 2", themesPerVolume: "Autoconhecimento; Projeto de Vida; Ética; Liderança; Resiliência.", methodologyFocus: "Reflexão crítica e protagonismo.", teacherGuidelines: "Debates sobre dilemas éticos e carreira." }
        ]
      },
      {
        name: "Educação Ambiental",
        description: "Consciência ecológica e práticas sustentáveis para regeneração do planeta.",
        details: [
          { cycle: "Fundamental 1", themesPerVolume: "Biodiversidade; Água; Lixo; Consumo; Clima.", methodologyFocus: "Observação e horta escolar.", teacherGuidelines: "Projetos práticos de reciclagem e plantio." },
          { cycle: "Fundamental 2", themesPerVolume: "Ecossistemas; Energias Renováveis; Ativismo; ESG; Futuro.", methodologyFocus: "Investigação científica e ação social.", teacherGuidelines: "Análise de impactos globais e política ambiental." }
        ]
      },
      {
        name: "Saúde e Bem-estar",
        description: "Promoção de hábitos saudáveis, equilíbrio físico e mental.",
        details: [
          { cycle: "Fundamental 1", themesPerVolume: "Higiene; Alimentação Colorida; Sono; Atividade Física; Sentidos.", methodologyFocus: "Formação de hábitos através da rotina e ludicidade.", teacherGuidelines: "Trabalhar a prevenção e o autocuidado básico de forma positiva." },
          { cycle: "Fundamental 2", themesPerVolume: "Nutrição Avançada; Saúde Mental; Mudanças no Corpo; Primeiros Socorros.", methodologyFocus: "Autonomia e compreensão dos sistemas biológicos.", teacherGuidelines: "Abordar temas de saúde pública e prevenção de riscos com seriedade." }
        ]
      },
      {
        name: "Educação Financeira",
        description: "Alfabetização financeira para o consumo consciente e planejamento de vida.",
        details: [
          { cycle: "Fundamental 1", themesPerVolume: "O Dinheiro; Querer vs Precisar; Poupança; Orçamento Familiar.", methodologyFocus: "Matemática aplicada e jogos de mercado.", teacherGuidelines: "Ensinar o valor do esforço e o conceito de reserva financeira." },
          { cycle: "Fundamental 2", themesPerVolume: "Investimentos; Juros; Empreendedorismo; Crédito; Inflação.", methodologyFocus: "Análise de cenários e elaboração de planos de negócios.", teacherGuidelines: "Focar em independência financeira e ética nas relações de consumo." }
        ]
      },
      {
        name: "Educação Digital",
        description: "Cidadania no mundo conectado, segurança e pensamento computacional.",
        details: [
          { cycle: "Fundamental 1", themesPerVolume: "Netiqueta; Senhas Seguras; Verdade vs Fake News; Equilíbrio Digital.", methodologyFocus: "Uso ético de ferramentas e discussões sobre convivência online.", teacherGuidelines: "Prevenção ao cyberbullying e proteção da identidade digital." },
          { cycle: "Fundamental 2", themesPerVolume: "Algoritmos; Programação; Inteligência Artificial; Crimes Digitais.", methodologyFocus: "Criação de conteúdo e análise crítica da mídia.", teacherGuidelines: "Debater pegada digital e as implicações sociais das redes." }
        ]
      },
      {
        name: "Cidadania e Ética",
        description: "Participação social, direitos humanos e construção de valores comuns.",
        details: [
          { cycle: "Fundamental 1", themesPerVolume: "Regras de Convivência; Respeito; Meus Direitos; Diversidade.", methodologyFocus: "Vivência em comunidade e projetos de solidariedade.", teacherGuidelines: "Fortalecer a noção de pertencimento e respeito mútuo." },
          { cycle: "Fundamental 2", themesPerVolume: "Democracia; Constituição; Minorias; Justiça; Paz Mundial.", methodologyFocus: "Simulações de conselhos e debates políticos apartidários.", teacherGuidelines: "Estimular o pensamento político e a defesa dos Direitos Humanos." }
        ]
      },
      {
        name: "Educação Etno-racial",
        description: "Valorização da cultura africana, indígena e combate ao racismo.",
        details: [
          { cycle: "Fundamental 1", themesPerVolume: "África e suas Cores; Povos Indígenas; Literatura Preta; Festas Culturais.", methodologyFocus: "Contação de histórias e artes visuais representativas.", teacherGuidelines: "Desconstruir estereótipos e celebrar a pluralidade brasileira." },
          { cycle: "Fundamental 2", themesPerVolume: "História da Resistência; Quilombos; Identidades; Ancestralidade; Cotas.", methodologyFocus: "Estudo de fontes históricas e análise sociológica.", teacherGuidelines: "Debater racismo estrutural e letramento racial avançado." }
        ]
      },
      {
        name: "Educação Inclusiva",
        description: "Respeito à neurodiversidade, acessibilidade e inclusão de pessoas com deficiência.",
        details: [
          { cycle: "Fundamental 1", themesPerVolume: "Amigo Diverso; Linguagens (Libras/Braille); Barreiras; Superação.", methodologyFocus: "Dinâmicas de empatia e uso de tecnologias assistivas.", teacherGuidelines: "Promover a acessibilidade atitudinal no ambiente escolar." },
          { cycle: "Fundamental 2", themesPerVolume: "Leis de Inclusão; Mercado de Trabalho; Neurodiversidade; Desenho Universal.", methodologyFocus: "Análise de espaços urbanos e proposição de soluções inclusivas.", teacherGuidelines: "Focar na quebra de capacitismo e no direito à participação plena." }
        ]
      }
    ];

    for (const col of collections) {
      const colRes = await client.query(
        'INSERT INTO "Collection" (name, description) VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET description = $2 RETURNING id',
        [col.name, col.description]
      );
      const colId = colRes.rows[0].id;

      for (const det of col.details) {
        await client.query(
          'INSERT INTO "CollectionDetail" ("collectionId", cycle, "themesPerVolume", "methodologyFocus", "teacherGuidelines") VALUES ($1, $2, $3, $4, $5)',
          [colId, det.cycle, det.themesPerVolume, det.methodologyFocus, det.teacherGuidelines]
        );
      }
    }

    console.log('✅ Todas as 8 coleções foram extraídas e semeadas!');
  } catch (err) {
    console.error('❌ Erro na carga das coleções:', err);
  } finally {
    await client.end();
  }
}

main();