# uNotes

Banco de dados: 
 - Usuario
  - Id
  - Nickname
  - Login
  - Senha
  - Email
  - Avatar
  - Telefone
  - CargoId
  - DataInclusao
  
 - Cargo
  - Id
  - Nome
  - Descricao
  
 - Grupo
  - Id
  - Nome
  
 - UsuarioGrupo
  - Id
  - UsuarioId
  - GrupoId
  - DataInclusao
  - DataExclusao
  
 - Notes
  - Id
  - Titulo
  - Texto 10000
  - CriadorId
  - Lixeira bit
  - Fixado bit
  - DataInclusao
  - DataAtualizacao
  - UsuarioAtualizacaoId
  - DocumentoId
  
 - Colaboradores
  - Id
  - UsuarioId
  - NotaId
  - DocumentoId
  - Status [Pendente, Aceito, Negado]
  
 - Documento
  - Id
  - Titulo
  - Texto 50000
  - CriadorId
  - Lixeira bit
  - DataInclusao
  - DataAtualizacao
  - UsuarioAtualizacaoId

Estudar: https://quilljs.com/
