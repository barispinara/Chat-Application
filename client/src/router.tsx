import { lazy, Suspense } from 'react'
import SuspenseLoader from './components/SuspenseLoader'
import { RouteObject } from 'react-router'

const Loader = (Component) => (props) =>
	(
		<Suspense fallback={<SuspenseLoader />}>
			<Component {...props} />
		</Suspense>
	)

const Home = Loader(
	lazy(() => import('src/content/pages/Home'))
)

const routes: RouteObject[] = [
	{
		path: '',
		element: <Home/>
	}
]

export default routes
