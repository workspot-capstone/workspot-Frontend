import { useParams } from 'react-router-dom'

function CafeDetail() {
	const { cafeId } = useParams()

	return <main><h1>카페 상세: {cafeId}</h1></main>
}

export default CafeDetail
