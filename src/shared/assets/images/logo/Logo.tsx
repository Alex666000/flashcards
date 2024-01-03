import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
        fill={'none'}
        height={36}
        ref={ref}
        viewBox={'0 0 157 36'}
        width={157}
        xmlns={'http://www.w3.org/2000/svg'}
        {...props}
    >
        <path
            d={
                'M70.9892 24.7159C69.7048 24.7159 68.5403 24.4391 67.496 23.8855C66.4636 23.3199 65.6473 22.5437 65.0471 21.5569C64.4589 20.558 64.1648 19.4328 64.1648 18.1813C64.1648 16.9297 64.4589 15.8105 65.0471 14.8237C65.6473 13.8248 66.4636 13.0486 67.496 12.495C68.5403 11.9294 69.7108 11.6466 71.0072 11.6466C72.0996 11.6466 73.084 11.8392 73.9603 12.2243C74.8486 12.6094 75.5929 13.1629 76.1931 13.885L74.3204 15.6179C73.4681 14.6311 72.4117 14.1377 71.1513 14.1377C70.371 14.1377 69.6748 14.3122 69.0625 14.6612C68.4503 14.9982 67.9701 15.4735 67.622 16.0873C67.2859 16.701 67.1178 17.399 67.1178 18.1813C67.1178 18.9635 67.2859 19.6615 67.622 20.2752C67.9701 20.889 68.4503 21.3704 69.0625 21.7194C69.6748 22.0563 70.371 22.2248 71.1513 22.2248C72.4117 22.2248 73.4681 21.7254 74.3204 20.7265L76.1931 22.4595C75.5929 23.1936 74.8486 23.7532 73.9603 24.1383C73.072 24.5234 72.0816 24.7159 70.9892 24.7159Z'
            }
            fill={'white'}
        />
        <path
            d={
                'M83.6574 24.7159C81.8568 24.7159 80.4523 24.2165 79.4439 23.2176C78.4476 22.2188 77.9494 20.7927 77.9494 18.9394V11.8632H80.8664V18.8311C80.8664 21.0936 81.8028 22.2248 83.6754 22.2248C84.5878 22.2248 85.284 21.954 85.7642 21.4125C86.2443 20.8589 86.4844 19.9984 86.4844 18.8311V11.8632H89.3655V18.9394C89.3655 20.7927 88.8613 22.2188 87.8529 23.2176C86.8566 24.2165 85.4581 24.7159 83.6574 24.7159Z'
            }
            fill={'white'}
        />
        <path
            d={
                'M101.503 17.9285C102.224 18.1572 102.788 18.5423 103.196 19.0838C103.604 19.6133 103.808 20.2692 103.808 21.0514C103.808 22.1586 103.376 23.013 102.512 23.6148C101.659 24.2044 100.411 24.4993 98.7663 24.4993H92.248V11.8632H98.4062C99.9428 11.8632 101.119 12.1581 101.935 12.7477C102.764 13.3374 103.178 14.1377 103.178 15.1486C103.178 15.7624 103.028 16.3099 102.728 16.7913C102.44 17.2727 102.031 17.6517 101.503 17.9285ZM95.1471 14.0655V17.044H98.0461C98.7663 17.044 99.3125 16.9176 99.6847 16.6649C100.057 16.4122 100.243 16.0391 100.243 15.5457C100.243 15.0523 100.057 14.6853 99.6847 14.4446C99.3125 14.1919 98.7663 14.0655 98.0461 14.0655H95.1471ZM98.5503 22.297C99.3185 22.297 99.8947 22.1706 100.279 21.9179C100.675 21.6652 100.873 21.2741 100.873 20.7446C100.873 19.6976 100.099 19.1741 98.5503 19.1741H95.1471V22.297H98.5503Z'
            }
            fill={'white'}
        />
        <path
            d={
                'M114.318 21.7916H108.465L107.349 24.4993H104.36L109.978 11.8632H112.859L118.495 24.4993H115.434L114.318 21.7916ZM113.399 19.5712L111.4 14.7334L109.402 19.5712H113.399Z'
            }
            fill={'white'}
        />
        <path
            d={'M121.781 14.246H117.747V11.8632H128.731V14.246H124.698V24.4993H121.781V14.246Z'}
            fill={'white'}
        />
        <path
            d={
                'M136.229 24.7159C134.92 24.7159 133.738 24.4331 132.682 23.8675C131.637 23.3019 130.815 22.5257 130.215 21.5388C129.627 20.54 129.332 19.4208 129.332 18.1813C129.332 16.9417 129.627 15.8285 130.215 14.8417C130.815 13.8429 131.637 13.0606 132.682 12.495C133.738 11.9294 134.92 11.6466 136.229 11.6466C137.537 11.6466 138.714 11.9294 139.758 12.495C140.803 13.0606 141.625 13.8429 142.225 14.8417C142.825 15.8285 143.125 16.9417 143.125 18.1813C143.125 19.4208 142.825 20.54 142.225 21.5388C141.625 22.5257 140.803 23.3019 139.758 23.8675C138.714 24.4331 137.537 24.7159 136.229 24.7159ZM136.229 22.2248C136.973 22.2248 137.645 22.0563 138.246 21.7194C138.846 21.3704 139.314 20.889 139.65 20.2752C139.998 19.6615 140.172 18.9635 140.172 18.1813C140.172 17.399 139.998 16.701 139.65 16.0873C139.314 15.4735 138.846 14.9982 138.246 14.6612C137.645 14.3122 136.973 14.1377 136.229 14.1377C135.485 14.1377 134.812 14.3122 134.212 14.6612C133.612 14.9982 133.138 15.4735 132.79 16.0873C132.454 16.701 132.286 17.399 132.286 18.1813C132.286 18.9635 132.454 19.6615 132.79 20.2752C133.138 20.889 133.612 21.3704 134.212 21.7194C134.812 22.0563 135.485 22.2248 136.229 22.2248Z'
            }
            fill={'white'}
        />
        <path
            d={
                'M153.349 24.4993L150.918 20.9792H150.774H148.235V24.4993H145.318V11.8632H150.774C151.89 11.8632 152.856 12.0498 153.673 12.4228C154.501 12.7959 155.137 13.3254 155.581 14.0114C156.025 14.6973 156.248 15.5096 156.248 16.4483C156.248 17.387 156.019 18.1993 155.563 18.8853C155.119 19.5592 154.483 20.0767 153.655 20.4377L156.482 24.4993H153.349ZM153.294 16.4483C153.294 15.7383 153.066 15.1967 152.61 14.8237C152.154 14.4386 151.488 14.246 150.612 14.246H148.235V18.6506H150.612C151.488 18.6506 152.154 18.458 152.61 18.0729C153.066 17.6878 153.294 17.1463 153.294 16.4483Z'
            }
            fill={'white'}
        />
        <path d={'M0 11.8783H2.91247V24.4724H0V11.8783Z'} fill={'white'} />
        <path
            d={'M8.50595 14.2532H4.47883V11.8783H15.4455V14.2532H11.4184V24.4724H8.50595V14.2532Z'}
            fill={'white'}
        />
        <path d={'M33.7412 11.8783H36.6577V24.4724H33.7412V11.8783Z'} fill={'white'} />
        <path
            d={
                'M51.2066 11.8783V24.4724H48.8121L42.529 16.826V24.4724H39.6485V11.8783H42.0609L48.326 19.5247V11.8783H51.2066Z'
            }
            fill={'white'}
        />
        <path
            clipRule={'evenodd'}
            d={
                'M34.987 6.53503C36.0696 6.53503 36.9474 7.41283 36.9474 8.49543C36.9474 9.57803 36.0696 10.4558 34.987 10.4558C33.9044 10.4558 33.0266 9.57803 33.0266 8.49543C33.0266 7.41283 33.9044 6.53503 34.987 6.53503Z'
            }
            fill={'#F23D61'}
            fillRule={'evenodd'}
        />
        <path
            clipRule={'evenodd'}
            d={
                'M19.4922 16.0372C20.6079 16.0372 21.512 16.9148 21.512 17.9976C21.512 19.0805 20.6079 19.958 19.4922 19.958C18.3766 19.958 17.4724 19.0805 17.4724 17.9976C17.4724 16.9148 18.3766 16.0372 19.4922 16.0372Z'
            }
            fill={'white'}
            fillRule={'evenodd'}
        />
        <path
            clipRule={'evenodd'}
            d={
                'M42.4778 34.5C51.5905 34.5 58.9778 27.1127 58.9778 18C58.9778 8.8873 51.5905 1.5 42.4778 1.5C33.3651 1.5 25.9778 8.8873 25.9778 18C25.9778 27.1127 33.3651 34.5 42.4778 34.5ZM42.4778 36C52.4189 36 60.4778 27.9411 60.4778 18C60.4778 8.05887 52.4189 0 42.4778 0C32.5367 0 24.4778 8.05887 24.4778 18C24.4778 27.9411 32.5367 36 42.4778 36Z'
            }
            fill={'white'}
            fillRule={'evenodd'}
        />
    </svg>
)

export default memo(forwardRef(SvgComponent))
