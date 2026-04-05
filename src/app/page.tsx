import { NavLinks } from '@/components/nav-links'
import { SocialIcons } from '@/components/social-icons'
import { Spotlight } from '@/components/spotlight'
import { TechTag } from '@/components/tech-icons'
import {
	getExperiences,
	getProfile,
	getProjects,
	getSkills,
} from '@/data/projects'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
	const profile = getProfile()
	const experiences = getExperiences()
	const projects = getProjects()
	const skills = getSkills()
	return (
		<Spotlight>
			<div className='mx-auto min-h-screen max-w-7xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0'>
				<div className='lg:flex lg:justify-between lg:gap-4'>
					{/* ── Left Column (sticky) ── */}
					<header className='lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/2 lg:max-w-md lg:flex-col lg:justify-between lg:py-24'>
						<div>
							<h1 className='text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl'>
								{profile.name}
							</h1>
							<h2 className='mt-3 text-lg font-medium tracking-tight text-slate-200'>
								{profile.role}
							</h2>
							<p className='mt-4 max-w-xs text-sm leading-relaxed text-slate-300'>
								{profile.bio}
							</p>
							<div className='mt-16'>
								<NavLinks />
							</div>
						</div>
						<div className='mt-8'>
							<SocialIcons
								github={profile.github}
								linkedin={profile.linkedin}
								email={profile.email}
								phone={profile.phone}
							/>
						</div>
					</header>

					{/* ── Right Column (scrollable) ── */}
					<main className='pt-24 lg:w-1/2 lg:py-24'>
						{/* About */}
						<section
							id='about'
							className='mb-16 scroll-mt-16 lg:mb-24 lg:scroll-mt-24'
						>
							<SectionHeading>About</SectionHeading>
							<div className='space-y-4 text-slate-300'>
								{profile.about.map((p, i) => (
									<p key={i}>{p}</p>
								))}
							</div>
							<div className='mt-8 flex flex-wrap gap-2'>
								{[...skills.languages, ...skills.state].map(
									(s) => (
										<TechTag key={s} name={s} />
									),
								)}
							</div>
						</section>

						{/* Education */}
						<section
							id='education'
							className='mb-16 scroll-mt-16 lg:mb-24 lg:scroll-mt-24'
						>
							<SectionHeading>Education</SectionHeading>
							<div className='group relative -mx-4 grid rounded-lg p-4 transition-all duration-300 ease-in-out hover:bg-slate-300/5 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg sm:grid-cols-8 sm:gap-8 md:gap-4'>
								<div className='mb-2 mt-1 sm:col-span-2'>
									<Image
										src='/school-logo.svg'
										alt='School logo'
										width={60}
										height={60}
										className='h-15 w-15 rounded-md'
									/>
								</div>
								<div className='sm:col-span-6'>
									<h3 className='font-medium leading-snug text-slate-100 transition-colors duration-300 ease-in-out group-hover:text-teal'>
										{profile.school}
									</h3>
									<p className='mt-1 text-sm text-slate-300'>
										{profile.degree}
									</p>
									<p className='mt-1 text-xs text-slate-400'>
										{profile.schoolYears}
									</p>
								</div>
							</div>
						</section>

						{/* Experience */}
						<section
							id='experience'
							className='mb-16 scroll-mt-16 lg:mb-24 lg:scroll-mt-24'
						>
							<SectionHeading>Experience</SectionHeading>
							<div className='space-y-2'>
								{experiences.map((exp) => (
									<div
										key={exp.company}
										className='group relative -mx-4 grid rounded-lg p-4 transition-all duration-300 ease-in-out hover:bg-slate-300/5 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg sm:grid-cols-8 sm:gap-8 md:gap-4'
									>
										<div className='mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:col-span-2'>
											{exp.period}
										</div>
										<div className='sm:col-span-6'>
											<h3 className='font-medium leading-snug flex items-center gap-2'>
												<span className='text-slate-100 transition-colors duration-300 ease-in-out group-hover:text-teal'>
													{exp.role} · {exp.company}
												</span>
												{exp.current && (
													<span className='ml-2 inline-flex items-center gap-1.5 rounded-full bg-teal px-2.5 py-1 align-middle text-[10px] font-bold uppercase leading-none tracking-wider text-navy-900 shadow-[0_0_12px_rgba(100,255,218,0.4)]'>
														<span className='h-1.5 w-1.5 animate-pulse rounded-full bg-navy-900' />
														Now
													</span>
												)}
											</h3>
											<ul className='mt-2 space-y-1.5'>
												{exp.points.map((point, i) => (
													<li
														key={i}
														className='flex items-start gap-2 text-sm leading-relaxed text-slate-300'
													>
														<span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal/50' />
														{point}
													</li>
												))}
											</ul>
											<div className='mt-3 flex flex-wrap gap-2'>
												{exp.tech.map((t) => (
													<TechTag key={t} name={t} />
												))}
											</div>
										</div>
									</div>
								))}
							</div>
							<div className='mt-12'>
								<a
									href={profile.cvUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='group inline-flex items-center gap-1 font-medium text-slate-100 transition-colors duration-200 hover:text-teal'
								>
									View Full Résumé
									<span className='transition-transform duration-200 group-hover:translate-x-1'>
										→
									</span>
								</a>
							</div>
						</section>

						{/* Projects */}
						<section
							id='projects'
							className='mb-16 scroll-mt-16 lg:mb-24 lg:scroll-mt-24'
						>
							<SectionHeading>Projects</SectionHeading>
							<div className='space-y-2'>
								{projects.map((project) => (
									<Link
										key={project.slug}
										href={`/projects/${project.slug}`}
										className='group relative -mx-4 block cursor-pointer rounded-lg p-4 transition-all duration-300 ease-in-out hover:bg-slate-300/5 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg'
									>
										<div className='grid sm:grid-cols-8 sm:gap-8 md:gap-4'>
											<div className='mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:col-span-2'>
												{project.year}
											</div>
											<div className='sm:col-span-6'>
												<h3 className='font-medium leading-snug'>
													<span className='text-slate-100 transition-colors duration-300 ease-in-out group-hover:text-teal'>
														{project.title}
													</span>
													<span className='ml-1 inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5'>
														↗
													</span>
												</h3>
												<p className='mt-2 text-sm leading-relaxed text-slate-300'>
													{project.description}
												</p>
												<div className='mt-3 flex flex-wrap gap-2'>
													{project.tech.map((t) => (
														<TechTag
															key={t}
															name={t}
														/>
													))}
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>
						</section>

						<div className='pb-24' />
					</main>
				</div>
			</div>
		</Spotlight>
	)
}

function SectionHeading({ children }: { children: React.ReactNode }) {
	return (
		<h2 className='mb-8 text-sm font-bold uppercase tracking-widest text-slate-100 lg:sr-only'>
			{children}
		</h2>
	)
}
