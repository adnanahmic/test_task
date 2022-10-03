import { Skeleton, Box } from '@mui/material';
import styled from '@emotion/styled';

const SkeletonLoader = () => {
    return (
        <MuiBox >
            <MuiSkeleton />
            <MuiSkeleton />
            <SkeletonContent />
            <SkeletonContent />
            <SkeletonContent />
            <SkeletonContent />
        </MuiBox>
    )
}

const MuiBox = styled(Box)`
    width: 100% !important
`
const MuiSkeleton = styled(Skeleton)`
    background-color: #C1C1C1;
    padding-top: 30px;
    width: 70%;
    margin: auto
`
const SkeletonContent = styled(Skeleton)`
    background-color: #C1C1C1;
    padding-top: 18vh;
    width: 60%;
    margin: auto
`

export default SkeletonLoader