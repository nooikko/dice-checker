import { Plan } from './components/Plan';
import { Container } from '$components/General/Container';

export function Pricing() {
  return (
    <section id='pricing' aria-label='Pricing' className='bg-slate-900 py-20 sm:py-32'>
      <Container>
        <div className='md:text-center'>
          <h2 className='font-display text-3xl tracking-tight text-white sm:text-4xl'>
            <span className='relative whitespace-nowrap'>
              <span className='relative'>Simple pricing,</span>
            </span>{' '}
            for everyone.
          </h2>
          <p className='mt-4 text-lg text-slate-400'>Whether a duo or a raiding party, there's a place for everyone.</p>
        </div>
        <div className='-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8'>
          <Plan
            name='Starter'
            price='Free'
            description='Great for players who trust their dice.'
            href='/register'
            features={[
              'Send 10 quotes and invoices',
              'Connect up to 2 bank accounts',
              'Track up to 15 expenses per month',
              'Manual payroll support',
              'Export up to 3 reports',
            ]}
          />
          <Plan
            featured
            name='Dice Skeptic'
            price='$9'
            description='Perfect for players who don’t trust their dice.'
            href='/register'
            features={[
              'Send 25 quotes and invoices',
              'Connect up to 5 bank accounts',
              'Track up to 50 expenses per month',
              'Automated payroll support',
              'Export up to 12 reports',
              'Bulk reconcile transactions',
              'Track in multiple currencies',
            ]}
          />
          <Plan
            name='Forever DM'
            price='$15'
            description='Great for a group of adventurers'
            href='/register'
            features={[
              'Send unlimited quotes and invoices',
              'Connect up to 15 bank accounts',
              'Track up to 200 expenses per month',
              'Automated payroll support',
              'Export up to 25 reports, including TPS',
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
