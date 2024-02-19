import { Fragment } from 'react';
import { Pagination } from 'react-bootstrap';

function CusPagination({ pages, page, setSearchParams, params = null }) {
    const width = window.innerWidth;

    let paginationItems = [];
    if (pages <= 10) {
        for (let number = 1; number <= pages; number++) {
            paginationItems.push(
                <Pagination.Item
                    key={number}
                    active={page ? number === Number(page) : number === 1}
                    onClick={() => setSearchParams({ page: number, ...params })}
                >
                    {number}
                </Pagination.Item>
            );
        }
    } else {
        let startPage, endPage;
        const curPage = Number(page) || 1;

        if (curPage >= 7 && curPage < pages - 4) {
            startPage = curPage - 3;
            endPage = curPage + 3;
        } else if (pages - 4 <= curPage) {
            startPage = pages - 6;
            endPage = pages;
        } else {
            startPage = 1;
            endPage = 7;
        }

        for (let number = startPage; number <= endPage; number++) {
            paginationItems.push(
                <Pagination.Item
                    key={number}
                    active={number === curPage}
                    onClick={() => setSearchParams({ page: number, ...params })}
                >
                    {number}
                </Pagination.Item>
            );
        }
    }

    return (
        <Pagination size="lg">
            {window > 739 && (
                <Pagination.First
                    disabled={page ? Number(page) === 1 : true}
                    onClick={() =>
                        setSearchParams({
                            page: Number(page) - 1,
                            ...params,
                        })
                    }
                />
            )}
            {width > 739 && pages > 10 && page >= 7 && (
                <Fragment>
                    <Pagination.Item
                        onClick={() =>
                            setSearchParams({
                                page: 1,
                                ...params,
                            })
                        }
                    >
                        {1}
                    </Pagination.Item>
                    <Pagination.Item
                        onClick={() =>
                            setSearchParams({
                                page: 2,
                                ...params,
                            })
                        }
                    >
                        {2}
                    </Pagination.Item>
                    <Pagination.Ellipsis disabled />
                </Fragment>
            )}

            {paginationItems}

            {width > 739 && pages > 10 && pages - 4 > page && (
                <Fragment>
                    <Pagination.Ellipsis disabled />
                    <Pagination.Item
                        onClick={() =>
                            setSearchParams({
                                page: pages - 1,
                                ...params,
                            })
                        }
                    >
                        {pages - 1}
                    </Pagination.Item>
                    <Pagination.Item
                        onClick={() =>
                            setSearchParams({
                                page: pages,
                                ...params,
                            })
                        }
                    >
                        {pages}
                    </Pagination.Item>
                </Fragment>
            )}

            {window > 739 && (
                <Pagination.Last
                    disabled={page ? Number(page) === pages : false}
                    onClick={() =>
                        setSearchParams({
                            page: Number(page || 1) + 1,
                            ...params,
                        })
                    }
                />
            )}
        </Pagination>
    );
}

export default CusPagination;
