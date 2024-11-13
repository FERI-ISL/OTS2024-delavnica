import Menu from "../components/Menu"
import DynamicTable from "../components/DynamicTable"
import {Box, Button, InputAdornment, Modal, TextField, Typography} from "@mui/material"
import {useState} from "react"
import SearchIcon from '@mui/icons-material/Search';


const ResumesPage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

    const data = [
        { id: '120948', summary: 'Ut rutrum purus ut cursus laoreet. Vestibulum et commodo lectus. Praesent blandit augue et egestas dapibus. Etiam risus nibh, auctor quis hendrerit a, suscipit ac elit. Morbi quis enim viverra, scelerisque massa nec, vestibulum elit. Cras et arcu consectetur, fringilla nulla ac, consequat urna. Pellentesque feugiat justo vitae elit pellentesque, a consectetur libero venenatis. Mauris nibh mauris, dictum vitae hendrerit id, rhoncus vel lectus. Vestibulum mollis ante a elementum porttitor. Proin consectetur sagittis dolor in dapibus.' },
        { id: '120949', summary: 'Suspendisse malesuada pellentesque sapien id dapibus. Curabitur pellentesque iaculis molestie. Nam id commodo ipsum. Nunc placerat massa ac arcu semper tempus. Donec bibendum odio feugiat odio vestibulum lacinia. Maecenas tempor a velit nec porta. Aenean maximus ac ipsum nec varius. Proin iaculis commodo nibh, in lobortis eros tristique vitae. Etiam mauris neque, dignissim sed semper at, malesuada nec arcu. Aliquam consectetur suscipit efficitur. Donec fermentum, tellus at iaculis fringilla, orci nulla aliquet ipsum, nec faucibus dolor lacus ut metus. Proin mi neque, ornare non sagittis id, efficitur a felis. Donec elementum eleifend ligula, vel sollicitudin tortor faucibus et.' },
        { id: '120950', summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit imperdiet sapien, ut blandit metus molestie hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae Curabitur ullamcorper tortor neque, ac accumsan tortor luctus non. Aliquam magna libero, hendrerit quis volutpat at, pretium ut nulla. Curabitur venenatis ullamcorper erat, et porta sem. Mauris dictum vulputate purus sed aliquet. Ut viverra odio sit amet odio placerat finibus. Nulla eget urna egestas, venenatis odio ac, pretium felis. Duis placerat turpis auctor nisl dapibus feugiat. Nullam commodo nisl vel dui luctus, vel vulputate mauris convallis. Ut vulputate, quam eget ultrices maximus, metus magna blandit mi, ut pretium purus arcu sit amet quam. Maecenas sollicitudin elementum convallis. Ut feugiat porttitor sem sit amet feugiat. Duis quis tristique mi. Suspendisse sollicitudin vehicula feugiat. Duis placerat, sem quis elementum congue, mauris justo molestie eros, eget viverra metus dui sit amet eros.' },
    ]

    const handleInfoClick = async (rowData) => {
        setModalData('Proin et eros vel arcu varius euismod. Aliquam risus lectus, viverra ut blandit nec, semper id lectus. Donec et porttitor risus, sit amet varius libero. Morbi finibus sem eget erat volutpat rutrum. Proin quis auctor diam. Duis sit amet pharetra eros. Duis accumsan, felis at bibendum vehicula, dui lacus cursus lectus, sed tincidunt felis libero vitae quam.')
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setModalData(null)
    }

    return (
        <>
            <Menu />

            <Box sx={{ maxWidth: '90%', margin: '20px auto' }}>
                <TextField
                    fullWidth
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by any field"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <DynamicTable data={data} infoCallback={handleInfoClick} />

             <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Row Information
                    </Typography>
                    {modalData && (
                        <Box id="modal-description" sx={{ mt: 2 }}>
                            {modalData}
                        </Box>
                    )}
                    <Button onClick={handleCloseModal} sx={{ mt: 3 }} variant="contained">
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default ResumesPage