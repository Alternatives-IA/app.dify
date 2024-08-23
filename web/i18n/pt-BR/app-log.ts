const translation = {
  title: 'Registros',
  description: 'Os registros registram o status de execução do aplicativo, incluindo entradas do usuário e respostas do AI.',
  dateTimeFormat: 'MM/DD/YYYY hh:mm A',
  table: {
    header: {
      updatedTime: 'Hora de atualização',
      time: 'Hora de criação',
      endUser: 'Usuário Final',
      input: 'Entrada',
      output: 'Saída',
      summary: 'Título',
      messageCount: 'Contagem de Mensagens',
      userRate: 'Taxa de Usuário',
      adminRate: 'Taxa de Op.',
      startTime: 'HORA DE INÍCIO',
      status: 'STATUS',
      runtime: 'TEMPO DE EXECUÇÃO',
      tokens: 'TOKENS',
      user: 'USUÁRIO FINAL',
      version: 'VERSÃO',
    },
    pagination: {
      previous: 'Anterior',
      next: 'Próximo',
    },
    empty: {
      noChat: 'Ainda não há conversas',
      noOutput: 'Sem saída',
      element: {
        title: 'Tem alguém aí?',
        content: 'Observe e anote as interações entre os usuários finais e os aplicativos de IA aqui para melhorar continuamente a precisão da IA. Você pode tentar <shareLink>compartilhar</shareLink> ou <testLink>testar</testLink> o aplicativo da Web você mesmo, e depois voltar para esta página.',
      },
    },
  },
  detail: {
    time: 'Hora',
    conversationId: 'ID da Conversa',
    promptTemplate: 'Modelo de Prompt',
    promptTemplateBeforeChat: 'Modelo de Prompt Antes do Chat · Como Mensagem do Sistema',
    annotationTip: 'Melhorias Marcadas por {{user}}',
    timeConsuming: '',
    second: 's',
    tokenCost: 'Token gasto',
    loading: 'carregando',
    operation: {
      like: 'curtir',
      dislike: 'não curtir',
      addAnnotation: 'Adicionar Melhoria',
      editAnnotation: 'Editar Melhoria',
      annotationPlaceholder: 'Digite a resposta esperada que você deseja que o AI responda, o que pode ser usado para ajustar o modelo e melhorar continuamente a qualidade da geração de texto no futuro.',
    },
    variables: 'Variáveis',
    uploadImages: 'Imagens Carregadas',
  },
  filter: {
    period: {
      today: 'Hoje',
      last7days: 'Últimos 7 dias',
      last4weeks: 'Últimas 4 semanas',
      last3months: 'Últimos 3 meses',
      last12months: 'Últimos 12 meses',
      monthToDate: 'Mês até hoje',
      quarterToDate: 'Trimestre até hoje',
      yearToDate: 'Ano até hoje',
      allTime: 'Todo o tempo',
    },
    annotation: {
      all: 'Tudo',
      annotated: 'Melhorias Anotadas ({{count}} itens)',
      not_annotated: 'Não Anotado',
    },
    sortBy: 'Ordenar por:',
    descending: 'decrescente',
    ascending: 'crescente',
  },
  workflowTitle: 'Registros de Fluxo de Trabalho',
  workflowSubtitle: 'O registro registrou a operação do Automate.',
  runDetail: {
    title: 'Registro de Conversa',
    workflowTitle: 'Detalhes do Registro',
  },
  promptLog: 'Registro de Prompt',
  agentLog: 'Registro do agente',
  viewLog: 'Ver Registro',
  agenteLogDetail: {
    agentMode: 'Modo Agente',
    toolUsed: 'Ferramenta usada',
    iterações: 'Iterações',
    iteração: 'Iteração',
    finalProcessing: 'Processamento Final',
  },
}

export default translation
