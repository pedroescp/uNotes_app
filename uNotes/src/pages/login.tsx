function Login() {
	return (
		<div className='flex justify-center items-center h-screen bg-slate-700'>
			<div className='card w-[520px] bg-base-100 shadow-xl'>
				<div className='card-body items-center text-center'>
					<h2 className='card-title'>Login</h2>
					<div className='divider'></div>
					<div className='form-control w-full max-w-xl'>
						<label className='label'>
							<span className='label-text'>Usuário / E-mail</span>
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
					<div className='form-control w-full max-w-xl'>
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
					<div className='form-control w-full items-start mb-5 gap-2'>
						<label className='label cursor-pointer'>
							<input type='checkbox' className='checkbox' />
							<span className='label-text pl-4'>Lembrar-me</span>
						</label>
						<a className='link'>Esqueci a senha</a>
					</div>

					<button className='btn btn-primary btn-wide'>Entrar</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
