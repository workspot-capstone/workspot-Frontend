import { useParams } from 'react-router-dom'

function CafeDetailPage() {
	const { cafeId } = useParams()

	return <main><h1>카페 상세: {cafeId}</h1></main>
}

export default CafeDetailPage
