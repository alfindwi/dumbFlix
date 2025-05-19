package DumbFlix.DumbFlix_BE.entity.categories;

import java.util.List;

import DumbFlix.DumbFlix_BE.entity.movie.Movies;
import DumbFlix.DumbFlix_BE.entity.series.Series;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "category")
public class Categories {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;
    
    @Column(nullable = false, unique = true)
    private String categoryName;

    @ManyToMany(mappedBy = "categories")
    private List<Movies> movies;

    @ManyToMany(mappedBy = "categories")
    private List<Series> series;
}
