import React, { useEffect, useState } from 'react'
// @ts-ignore
import { ThreeBounce } from 'better-react-spinkit'
import InfiniteScroll from 'react-infinite-scroll-component'
import ContentsCategoryName from './ContentsCategoryName'
import ContentsListItem from './ContentsListItem'
import { repos } from '../../../util/repos'
import testData from '../../../util/testData'
import { psString } from '../../../util/localization'

// document list GET API, parameter SET
const setParams = (pageNo: number) =>
  Promise.resolve({
    pageNo: pageNo,
    tag: 'template',
    path: 'latest'
  })

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

export default function() {
  const [state, setState] = useState({
    list: [],
    endPage: false
  })
  const [listLength, setListLength] = useState(2)

  const params = {
    pageNo: 1,
    tag: 'template',
    path: 'latest'
  }

  // 문서 list GET
  const getDocumentList = () =>
    repos.Document.getDocumentList(params).then((res: any) =>
      setState({
        list: res.resultList,
        endPage: res.resultList.length < 10
      })
    )

  // TODO po로 부터 태그 GET 필요
  // category GET
  const getCategory = () => testData.tag || 'template'

  // 무한 스크롤 추가 데이터 GET
  const fetchData = async () =>
    Promise.resolve(await setListLength(listLength + 1))
      .then(() => setParams(listLength))
      .then(res => repos.Document.getDocumentList(res))
      .then(res => setResultList(state.list, res.resultList || []))
      .then((res: any) =>
        setState({ list: res.listData, endPage: res.isEndPage })
      )
      .catch(err => err)

  useEffect(() => {
    void getDocumentList()
  }, [])

  return (
    <div className="container">
      <ContentsCategoryName category={psString('tag-' + getCategory())} />

      {state.list && state.list.length > 0 && (
        <InfiniteScroll
          dataLength={state.list.length}
          next={fetchData}
          hasMore={!state.endPage}
          loader={
            <div className="cl_spinner mb-4 d-flex">
              <ThreeBounce color="#3681fe" name="ball-pulse-sync" />
            </div>
          }
        >
          <div className="cl_contentsList mt-3 row">
            {state.list.map((result: any) => (
              <div
                className="col-12 col-md-6 col-lg-4 mb-4"
                key={result.documentId + result.accountId}
              >
                <ContentsListItem documentData={result} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  )
}
