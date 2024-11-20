import Menu from "../components/Menu";
import DynamicTable from "../components/DynamicTable";
import {Box, Button, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const ApplicationsPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [employmentData, setEmploymentData] = useState(null)
    const [salaryData, setSalaryData] = useState(null)
    const [newModalOpen, setNewModalOpen] = useState(false)
    const [data, setData] = useState([])
    const [selectedAgeOption, setSelectedAgeOption] = useState('<35')
    const [selectedAccessibilityOption, setSelectedAccessibilityOption] = useState('No')
    const [selectedEdLevelOption, setSelectedEdLevelOption] = useState('Undergraduate')
    const [selectedEmploymentOption, setSelectedEmploymentOption] = useState('No')
    const [selectedGenderOption, setSelectedGenderOption] = useState('Man')
    const [selectedMentalHealthOption, setSelectedMentalHealthOption] = useState('Yes')
    const [selectedMainBranchOption, setSelectedMainBranchOption] = useState('Dev')
    const [yearsCode, setYearsCode] = useState(0)
    const [yearsCodePro, setYearsCodePro] = useState(0)
    const [country, setCountry] = useState('Slovenia')
    const [computerSkills, setComputerSkills] = useState(0)

    const handleInfoClick = async (rowData) => {
        const employmentPrediction = await axios.post('http://localhost:5555/predict/employment', rowData)
        const salaryPrediciton = await axios.post('http://localhost:5555/predict/salary', rowData)

        console.log(employmentPrediction.data.employment)
        console.log(salaryPrediciton.data.salary)

        setEmploymentData(employmentPrediction.data.employment)
        setSalaryData(salaryPrediciton.data.salary)

        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false)
    };

    const handleNewModalOpen = () => {
        setNewModalOpen(true);
    };

    const handleNewModalClose = () => {
        setNewModalOpen(false);
    };

    const fetchApplicationsData = async () => {
        try {
            const applications = await axios.get('http://localhost:5555/applications')
            setData(applications.data.applications)
        } catch (err) {
            console.log('Error fetching data')
        }
    }

    const handleAgeChange = (event) => {
        setSelectedAgeOption(event.target.value);
    }

    const handleAccessibilityChange = (event) => {
        setSelectedAccessibilityOption(event.target.value);
    }

    const handleEdLevelChange = (event) => {
        setSelectedEdLevelOption(event.target.value);
    }

    const handleEmploymentChange = (event) => {
        setSelectedEmploymentOption(event.target.value);
    }

    const handleGenderChange = (event) => {
        setSelectedGenderOption(event.target.value);
    }

    const handleMentalHealthChange = (event) => {
        setSelectedMentalHealthOption(event.target.value);
    }

    const handleMainBranchChange = (event) => {
        setSelectedMainBranchOption(event.target.value);
    }

    const handleSaveNewApplication = async () => {
        const newApplication = {
            Age: selectedAgeOption,
            Accessibility: selectedAccessibilityOption,
            EdLevel: selectedEdLevelOption,
            Employment: selectedEmploymentOption,
            Gender: selectedGenderOption,
            MentalHealth: selectedMentalHealthOption,
            MainBranch: selectedMainBranchOption,
            YearsCode: yearsCode,
            YearsCodePro: yearsCodePro,
            Country: country,
            ComputerSkills: computerSkills
        }

        const addResponse = await axios.post('http://localhost:5555/applications', newApplication)

        if(addResponse.status === 201) {
            setData([...data, addResponse.data])
            handleNewModalClose()
        } else {
            console.log(addResponse.data.message)
        }
    }

    useEffect(() => {
        fetchApplicationsData()
    }, [])

    return (
        <>
            <Menu />
            <Box sx={{ maxWidth: '50%', margin: '20px auto', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<NoteAddIcon />}
                    onClick={handleNewModalOpen}
                >
                    New
                </Button>
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
                        width: 350,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="modal-title" variant="h5" component="h2" sx={{ borderBottom: "1px solid #ededed", textAlign: "center", marginBottom: "0.5em" }}>
                        Predictions
                    </Typography>

                    <Box id={'modal-description-predictions'} sx={{ textAlign: "center" }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: 'right', paddingRight: '10px' }}><strong>Employment:</strong></td>
                                    <td style={{ textAlign: 'left' }}>{employmentData !== null && employmentData !== undefined ? employmentData : 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'right', paddingRight: '10px' }}><strong>Salary:</strong></td>
                                    <td style={{ textAlign: 'left' }}>{salaryData !== null && salaryData !== undefined ? salaryData.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Button onClick={handleCloseModal} sx={{ mt: 3 }} variant="contained">Close</Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={newModalOpen}
                onClose={handleNewModalClose}
                aria-labelledby="new-modal-title"
                aria-describedby="new-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: '75%',
                        overflowY: 'scroll'
                    }}
                >
                    <Typography id="new-modal-title" variant="h6" component="h2" sx={{ borderBottom: "1px solid #ededed", textAlign: "center", marginBottom: "0.5em" }}>
                        Create New Item
                    </Typography>
                    <Typography id="new-modal-description" sx={{ mt: 2 }}>
                        <InputLabel id="select-label-age">Age</InputLabel>
                        <Select
                            labelId="select-label-age"
                            id="select-age"
                            value={selectedAgeOption}
                            onChange={handleAgeChange}
                            fullWidth
                            sx={{mb: 2}}
                        >
                            <MenuItem value="<35">{'<35'}</MenuItem>
                            <MenuItem value=">35">{'>35'}</MenuItem>
                        </Select>

                        <InputLabel id="select-label-accessibility">Accessibility</InputLabel>
                        <Select
                            labelId="select-label-accessibility"
                            id="select-accessibility"
                            value={selectedAccessibilityOption}
                            onChange={handleAccessibilityChange}
                            fullWidth
                            sx={{mb: 2}}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>

                        <InputLabel id="select-label-ed-level">EdLevel</InputLabel>
                        <Select
                            labelId="select-label-ed-level"
                            id="select-ed-level"
                            value={selectedEdLevelOption}
                            onChange={handleEdLevelChange}
                            fullWidth
                            sx={{mb: 2}}
                        >
                            <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                            <MenuItem value="Master">Master</MenuItem>
                            <MenuItem value="PhD">PhD</MenuItem>
                            <MenuItem value="NoHigherEd">NoHigherEd</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>

                        <InputLabel id="select-label-employment">Employment</InputLabel>
                        <Select
                            labelId="select-label-employment"
                            id="select-employment"
                            value={selectedEmploymentOption}
                            onChange={handleEmploymentChange}
                            fullWidth
                            sx={{mb: 2}}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>

                        <InputLabel id="select-label-gender">Gender</InputLabel>
                        <Select
                            labelId="select-label-gender"
                            id="select-gender"
                            value={selectedGenderOption}
                            onChange={handleGenderChange}
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                          <MenuItem value="Man">Man</MenuItem>
                          <MenuItem value="Woman">Woman</MenuItem>
                          <MenuItem value="NonBinary">NonBinary</MenuItem>
                        </Select>

                        <InputLabel id="select-label-mental-health">Mental Health</InputLabel>
                        <Select
                            labelId="select-label-mental-health"
                            id="select-mental-health"
                            value={selectedMentalHealthOption}
                            onChange={handleMentalHealthChange}
                            fullWidth
                            sx={{mb: 2}}
                        >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </Select>

                        <InputLabel id="select-label-main-branch">Main Branch</InputLabel>
                        <Select
                            labelId="select-label-main-branch"
                            id="select-main-branch"
                            value={selectedMainBranchOption}
                            onChange={handleMainBranchChange}
                            fullWidth
                            sx={{mb: 2}}
                        >
                          <MenuItem value="Dev">Dev</MenuItem>
                          <MenuItem value="NotDev">NotDev</MenuItem>
                        </Select>

                        <TextField
                            fullWidth
                            type={'number'}
                            label="YearsCode"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            value={yearsCode}
                            onChange={(event) => {setYearsCode(parseInt(event.target.value))}}
                        />

                        <TextField
                            fullWidth
                            type={'number'}
                            label="YearsCodePro"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            value={yearsCodePro}
                            onChange={(event) => {setYearsCodePro(parseInt(event.target.value))}}
                        />

                        <TextField
                            fullWidth
                            label="Country"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            value={country}
                            onChange={(event) => {setCountry(event.target.value)}}
                        />

                        <TextField
                            fullWidth
                            type={'number'}
                            label="ComputerSkills"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            value={computerSkills}
                            onChange={(event) => {setComputerSkills(parseInt(event.target.value))}}
                        />
                    </Typography>
                    <Button onClick={handleNewModalClose} sx={{ mt: 3 }} variant="contained">
                        Close
                    </Button>
                    <Button onClick={handleSaveNewApplication} sx={{ mt: 3 }} variant="contained">
                        Save
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default ApplicationsPage