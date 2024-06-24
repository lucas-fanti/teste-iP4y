-- Criação do banco de dados
--CREATE DATABASE sistema_cadastro;

-- Identificar sessões ativas
--SELECT pid, usename, datname, application_name, client_addr, backend_start, state
--FROM pg_stat_activity
--WHERE datname = 'sistema_cadastro';

-- Encerrar sessões ativas
--SELECT pg_terminate_backend(pid)
--FROM pg_stat_activity
--WHERE datname = 'sistema_cadastro';

-- Revogar todos os privilégios do usuário
--REVOKE ALL PRIVILEGES ON DATABASE sistema_cadastro FROM admin_user_ip4y;
--REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM admin_user_ip4y;
--REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM admin_user_ip4y;

-- Apagar o usuário
--DROP USER admin_user_ip4y;



-- Criação do usuário administrador
CREATE USER admin_user_ip4y WITH ENCRYPTED PASSWORD 'admin_password';

-- Concedendo privilégios ao usuário administrador
GRANT ALL PRIVILEGES ON DATABASE sistema_cadastro TO admin_user_ip4y;

-- Criação da tabela usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY, -- Chave primária única e autoincrementável
    cpf VARCHAR(11) NOT NULL UNIQUE, -- CPF do usuário, deve ser único
    nome VARCHAR(50) NOT NULL, -- Nome do usuário
    sobrenome VARCHAR(50) NOT NULL, -- Sobrenome do usuário
    data_nascimento DATE NOT NULL, -- Data de nascimento do usuário
    email VARCHAR(100) NOT NULL, -- E-mail do usuário
    genero VARCHAR(10) NOT NULL, -- Gênero do usuário (masculino ou feminino)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora de criação do registro
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data e hora da última atualização do registro
);

-- Comentários para a tabela usuarios
COMMENT ON TABLE usuarios IS 'Tabela que armazena os dados dos usuários cadastrados';

-- Comentários para as colunas da tabela usuarios
COMMENT ON COLUMN usuarios.id IS 'Chave primária única e autoincrementável';
COMMENT ON COLUMN usuarios.cpf IS 'CPF do usuário, deve ser único';
COMMENT ON COLUMN usuarios.nome IS 'Nome do usuário';
COMMENT ON COLUMN usuarios.sobrenome IS 'Sobrenome do usuário';
COMMENT ON COLUMN usuarios.data_nascimento IS 'Data de nascimento do usuário';
COMMENT ON COLUMN usuarios.email IS 'E-mail do usuário';
COMMENT ON COLUMN usuarios.genero IS 'Gênero do usuário (masculino ou feminino)';
COMMENT ON COLUMN usuarios.created_at IS 'Data e hora de criação do registro';
COMMENT ON COLUMN usuarios.updated_at IS 'Data e hora da última atualização do registro';

-- Trigger para atualizar a coluna updated_at quando um registro for modificado
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criação do trigger
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Indexes para melhorar a performance em buscas
CREATE INDEX idx_usuarios_cpf ON usuarios(cpf);
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- Concedendo privilégios de tabela e sequências ao usuário administrador
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin_user_ip4y;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin_user_ip4y;





