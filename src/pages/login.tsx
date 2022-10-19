function Login() {
	return (
		<div className='flex justify-center items-center h-screen bg-slate-700'>
			<div className='card w-96 bg-base-100 shadow-xl'>
				<div className='card-body items-center text-center'>
					<div className='flex flex-row gap-8'>
						<label className='swap swap-flip text-xl '>
							<input type='checkbox' defaultChecked />
							<h2
								className='swap-on tooltip tooltip-open tooltip-primary tooltip-top mt-3'
								data-tip='Novo? Clique aqui!'
							>
								Entrar
							</h2>
							<h2 className='swap-off'>Registro</h2>
						</label>
					</div>
					<div className='divider m-0'></div>
					<form className='form-control w-full max-w-xl'>
						<div className=''>
							<label className='label'>
								<span className='label-text'>
									Usuário / E-mail
								</span>
							</label>
							<input
								type='text'
								className='input input-bordered w-full max-w-xl'
							/>
							<label className='label hidden'>
								<span className='label-text-alt text-error'>
									Mensagem de erro padrão
								</span>
							</label>
						</div>
						<div className=''>
							<label className='label'>
								<span className='label-text'>Senha</span>
							</label>
							<input
								type='text'
								className='input input-bordered w-full max-w-xl'
							/>
							<label className='label hidden'>
								<span className='label-text-alt text-error'>
									Mensagem de erro padrão
								</span>
							</label>
						</div>
						<div className='flex flex-col items-start mb-5 gap-2'>
							<label className='label cursor-pointer'>
								<input type='checkbox' className='checkbox' />
								<span className='label-text pl-4'>
									Lembrar-me
								</span>
							</label>
							<a className='link'>Esqueci a senha</a>
						</div>

						<div className='flex flex-col items-center'>
							<button className='btn btn-primary btn-wide'>
								Entrar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
