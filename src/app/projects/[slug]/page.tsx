import { getAllProjectSlugs, getProject } from '@/data/projects'
import { Spotlight } from '@/components/spotlight'
import { TechTag } from '@/components/tech-icons'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
	return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const project = getProject(slug)
	if (!project) return { title: 'Not Found' }
	return {
		title: `${project.title} — Nguyen Van Hung`,
		description: project.description,
	}
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const project = getProject(slug)

	if (!project) {
		notFound()
	}

	return (
		<Spotlight>
			<div className='mx-auto min-h-screen max-w-3xl px-6 py-16 md:px-12 md:py-24'>
				{/* Back */}
				<Link
					href='/'
					className='group mb-8 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-teal transition-colors duration-150 hover:text-teal-hover'
				>
					<span className='transition-transform duration-200 group-hover:-translate-x-1'>←</span>
					Nguyen Van Hung
				</Link>

				{/* Images — at top */}
				{project.images.length > 0 && (
					<div className='mb-10 space-y-4'>
						{project.images.map((src, i) => (
							<div key={i} className='overflow-hidden rounded-lg border border-slate-200/10'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${src}`}
									alt={`${project.title} preview ${i + 1}`}
									width={800}
									height={450}
									className='w-full'
								/>
							</div>
						))}
					</div>
				)}

				{/* Header */}
				<header className='mb-12'>
					<div className='mb-3 flex items-center gap-3'>
						<span className='font-mono text-xs font-medium text-teal'>
							{project.id}
						</span>
						<span className='text-slate-400'>·</span>
						<span className='text-xs text-slate-400'>
							{project.year}
						</span>
					</div>
					<h1 className='mb-4 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl'>
						{project.title}
					</h1>
					<p className='text-base leading-relaxed text-slate-300'>
						{project.overview}
					</p>
					<div className='mt-4 flex flex-wrap gap-2'>
						{project.tech.map((tag) => (
							<TechTag key={tag} name={tag} />
						))}
					</div>
				</header>

				{/* Problem */}
				<section className='mb-12'>
					<h2 className='mb-4 text-sm font-bold uppercase tracking-widest text-slate-100'>
						Problem
					</h2>
					<p className='text-sm leading-relaxed text-slate-300'>
						{project.problem}
					</p>
				</section>

				{/* Solution */}
				<section className='mb-12'>
					<h2 className='mb-4 text-sm font-bold uppercase tracking-widest text-slate-100'>
						Solution
					</h2>
					<p className='text-sm leading-relaxed text-slate-300'>
						{project.solution}
					</p>
				</section>

				{/* Technical Highlights */}
				<section className='mb-12'>
					<h2 className='mb-4 text-sm font-bold uppercase tracking-widest text-slate-100'>
						Technical Highlights
					</h2>
					<ul className='space-y-3'>
						{project.highlights.map((item, i) => (
							<li key={i} className='flex items-start gap-3 text-sm'>
								<span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal' />
								<span className='leading-relaxed text-slate-300'>
									{item}
								</span>
							</li>
						))}
					</ul>
				</section>

				{/* Demo link */}
				{project.demo && (
					<section className='mb-12'>
						<a
							href={project.demo}
							target='_blank'
							rel='noopener noreferrer'
							className='group inline-flex cursor-pointer items-center gap-2 font-medium text-slate-100 transition-colors duration-200 hover:text-teal'
						>
							View live demo
							<span className='transition-transform duration-200 group-hover:translate-x-1'>↗</span>
						</a>
					</section>
				)}
			</div>
		</Spotlight>
	)
}
