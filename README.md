# uNotes

**Banco de dados:** 
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
   - UsuarioPaiId
  
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
   
 - Tags
   - Id
   - UsuarioId
   - Nome
   
 - TagsNotas
   - Id
   - NotaId
   - TagId
  
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


**Front:**
 - Telas:
   - Login
   - Listagem de Notas
     1. As notas fixadas ficam no topo, separadas das demais notas
     2. Ao clicar na Nota, abrir a mesma em modal 
     3. A tela deve conter espaço para digitar texto
     4. Na parte inferior deve-se ter as configurações de (Quillsjs), deletar nota, trocar entre modo texto e lista
     5. Na parte superior deve-se ter o título e o botão para fixar ou desfixar a nota
     6. Menu lateral: [Ícone] Lixeira...
   - Listagem de Documentos
     1. Documentos fixados ficam separados dos demais
     2. Ao clicar no Documento, abrir o mesmo na tela
     3. A tela deve conter espaço para digitar texto
     4. Na parte superior deve-se ter o título do documento (Padrão: `Documento sem nome`), as configurações de texto (Quilljs), salvar e deletar arquivo, exportar (PDF, DOCX), botão para compartilhar, opções de anexar notas ao arquivo











