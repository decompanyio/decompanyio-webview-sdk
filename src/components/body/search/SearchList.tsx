import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
// @ts-ignore
import { ThreeBounce } from 'better-react-spinkit'
import { repos } from '../../../util/repos'
import SearchListItem from './SearchListItem'

// GET 한 문서 데이터 set
const setResultList = (listData: any, resultList: any) =>
  new Promise(resolve => {
    const _resultList = resultList
    const data = {
      listData:
        listData.length > 0 ? listData.concat(_resultList) : _resultList,
      isEndPage: resultList.length < 10
    }
    resolve(data)
  })

export default function(props: any) {
  const [state, setState] = useState({
    list: [],
    endPage: false
  })
  const [listLength, setListLength] = useState(2)
  const [searchValue] = useState(props.location.state.searchValue)

  const getSearchDocuments = (params: any) =>
    repos.Custom.getSearchDocuments(params).then((res: any) =>
      setState({
        list: res.items,
        endPage: res.items.length < 10
      })
    )

  const getCommonSearchQuery = (meta: string): string =>
    ' more:pagemap:metatags-' + meta + ':'

  // @ts-ignore
  const getSpecificSearchOption = (): string => {
    let option = ''
    let poInfo = props.poInfo

    if (poInfo.tag) option = getCommonSearchQuery('tag') + poInfo.tag

    if (poInfo.extension)
      option +=
        (option ? ' AND ' : '') +
        getCommonSearchQuery('extension') +
        poInfo.extension

    return option
  }

  // document list GET API, parameter SET
  const setParams = (pageNo: number) =>
    Promise.resolve({
      start: pageNo,
      num: 10,
      q: searchValue + getSpecificSearchOption()
    })

  // 무한 스크롤 추가 데이터 GET
  const fetchData = async () =>
    Promise.resolve(await setListLength(listLength + 1))
      .then(() => setParams(listLength))
      .then(res => repos.Custom.getSearchDocuments(res))
      .then(res => setResultList(state.list, res.items || []))
      .then((res: any) =>
        setState({ list: res.listData, endPage: res.isEndPage })
      )
      .catch(err => err)

  useEffect(() => {
    void setParams(0).then(res => getSearchDocuments(res))
  }, [])

  return (
    <div className="container">
      <InfiniteScroll
        dataLength={state.list.length}
        next={fetchData}
        hasMore={!state.endPage}
        loader={
          <div className="sl_spinner mb-4 d-flex">
            <ThreeBounce color="#3681fe" name="ball-pulse-sync" />
          </div>
        }
      >
        <div className="sl_contentsList mt-3 row">
          {state.list.length > 0 &&
            state.list.map((result: any, idx) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={idx}>
                <SearchListItem documentData={result} idx={idx} />
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}
