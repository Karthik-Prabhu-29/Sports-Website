export default class WorkoutTracker{
    constructor(root){
        this.root = root;
        this.root.insertAdjacentHTML("afterbegin", WorkoutTracker.html());
        this.entries = [];

        this.loadEntries();
        this.updateView();
    }

    static html(){
        return `
                <table class="tracker">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Workout</th>
                    <th>Duraction</th>
                </tr>
            </thead>
            <tbody class="tracker__entries"></tbody>
            <tbody>
                <tr class="tracker__row tracker__row--add">
                    <td colspan="4">
                        <span class="tracker__add">
                            Add Entry &plus;
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        `;
    }

    static rowHtml(){
        return `
        <tr class="tracker__row">
        <td>
            <input type="date" class="tracker__date">
        </td>
        <td>
            <select class="tracker__workout">
                <option value="walking">Walking</option>
                <option value="running">Running</option>
                <option value="outdoor-cycling">Outdoor Cycling</option>
                <option value="indoor-cycling">Indoor Cycling</option>
                <option value="swimming">Swimming</option>
                <option value="yoga">Yoga</option>
            </select>
        </td>
        <td>
            <input type="number" class="tracker__duraction">
            <span class="tracker__text">minutes</span>
        </td>
        <td>
            <button type="button" class="tracker__button">&times;</button>
        </td>
    </tr>
        `;
    }

    loadEntries(){
        this.entries = JSON.parse(localStorage.getItem("workout-tracker-entries") || "[]" );
    }

    saveEntries(){
        localStorage.setItem("workout-tracker-entries", JSON.stringify(this.entries))
    }

    updateView(){
        const tablebody = this.root.querySelector(".tracker__entries");
        const addRow = data => {
            const template = document.createElement("template");
            let row = null;

            template.innerHTML = WorkoutTracker.rowHtml().trim();
            row = template.content.firstElementChild;

            row.querySelector(".tracker__date").value = data.date;
            row.querySelector(".tracker__workout").value = data.workout;
            row.querySelector(".tracker__duration").value = data.duraction;

            tablebody.appendChild(row);
        };

        tablebody.querySelectorAll(".tracker__row").forEach(row=>{
            row.delete();
        });

        this.entries.forEach(data => addRow(data));
    }
}

